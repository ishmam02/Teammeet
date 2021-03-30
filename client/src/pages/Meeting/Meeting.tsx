import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { filter, find } from 'lodash'
import { MediaConnection } from 'peerjs'
import PeerService from '../../services/PeerService'
import MediaService from '../../services/MediaService'
import MeetingService from '../../services/MeetingService'
import VideoService from '../../services/VideoService'
import AuthService from '../../services/AuthService'
import AlertService from '../../services/AlertService'
import NotificationService from '../../services/NotificationService'
import HostMiddleware from '../../middleware/HostMiddleware'
import store from '../../store'
import routes from '../../routes'
import { actions, selectors, VideoState, MeetingState } from './Meeting.state'
import socket from './Meeting.socket'
import VideoSkeleton from '../../components/VideoSkeleton/VideoSkeleton'
import Actions from '../../components/Actions/Actions'
import Video from '../../components/Video/Video'
import Page from '../../components/Page/Page'
import styles from './Meeting.module.scss'

interface MeetingProps extends MeetingState, RouteComponentProps {}

class Meeting extends Component<MeetingProps> {
  protected static raiseHandTimeout: number = 5000

  protected peerService: PeerService

  protected mediaService: MediaService

  protected meetingService: MeetingService

  protected videoService: VideoService

  protected authService: AuthService

  protected alertService: AlertService


  protected notificationService: NotificationService

  // protected hostMiddleware: HostMiddleware

  constructor (props: MeetingProps) {
    super(props)
    this.peerService = new PeerService()
    this.mediaService = new MediaService()
    this.meetingService = new MeetingService()
    this.videoService = new VideoService()
    this.authService = new AuthService()
    this.alertService = new AlertService()
    this.notificationService = new NotificationService()
    // this.hostMiddleware = new HostMiddleware()
    // this.hostMiddleware.auth(this.props.history)
    this.handleEndClick = this.handleEndClick.bind(this)
  }

  get activeVideo () {
    return find(this.props.videos, 'active')
  }

  get activeVideoCol () {
    return (
      this.activeVideo &&
      <IonCol size="12" role="activeVideo">
        <Video
          id={this.activeVideo.id}
          source={this.activeVideo.stream}
          ratio="wide"
          raiseHand={this.activeVideo.raiseHand}
          memberRemove={this.activeVideo.memberRemove}
          active={this.activeVideo.active}
          renderId={this.activeVideo.renderId} />
      </IonCol>
    )
  }

  video (video: VideoState, index: number) {
    return (
      <IonCol size="4" role="video" key={index}>
        <Video
          id={video.id}
          source={video.stream}
          ratio="square"
          raiseHand={video.raiseHand}
          memberRemove={video.memberRemove}
          active={video.active}
          renderId={video.renderId} />
      </IonCol>
    )
  }

  get videos () {
    const videos = filter(this.props.videos, { active: false })
    return videos.map((video: VideoState, index: number) => this.video(video, index))
  }

  handleRaiseHand (meetingId: string) {
    socket.raiseHand.subscribe(meetingId, connectionId => {
      store.dispatch(actions.setVideoRaiseHand(connectionId, true))
      setTimeout(() => {
        store.dispatch(actions.setVideoRaiseHand(connectionId, false))
      }, Meeting.raiseHandTimeout)
    })
  }

  handleMemberRemove (meetingId: string) {
    socket.memberRemove.subscribe(meetingId, connectionId => {
      const isUser = this.meetingService.isUserMeeting(connectionId)
      if (isUser) this.peerService.disconnect()
      else this.videoService.pullVideo(connectionId)
    })
  }

  socketUnsubscribe (meetingId: string) {
    socket.raiseHand.unsubscribe(meetingId)
    socket.conferenceCall.unsubscribe(meetingId)
    socket.remoteDisconnect.unsubscribe(meetingId)
    socket.memberRemove.unsubscribe(meetingId)
  }

  exitMeeting (meetingId: string) {
    this.videoService.stopUserVideo()
    this.meetingService.resetMeeting()
    this.socketUnsubscribe(meetingId)
    this.peerService.disconnect()
    // this.props.history.push(routes.home.path)
    this.authService.resetType()
  }

  handleDisconnect (meetingId: string, localConnectionId: string) {
    this.peerService.onDisconnect(() => {
      socket.remoteDisconnect.publish(meetingId, localConnectionId)
      this.exitMeeting(meetingId)
    })
  }

  handleUserStream (localConnectionId: string, localStream: MediaStream) {
    this.videoService.createVideo(localConnectionId, localStream, localVideo => {
      this.videoService.pushVideo(localVideo)
    })
  }

  handleCallStreaming (call: MediaConnection) {
    this.peerService.onCalling(call, (remoteConnectionId, remoteStream) => {
      this.videoService.createVideo(remoteConnectionId, remoteStream, remoteVideo => {
        this.videoService.pushVideo(remoteVideo)
      })
    })
  }

  handleReceiveCall (meetingId: string, localStream: MediaStream) {
    this.peerService.onReceiveCall(call => {
      const { peer: connectionId } = call
      this.peerService.answerCall(call, localStream)
      socket.conferenceCall.publish(meetingId, connectionId)
      this.notificationService.notifyHost(connectionId)
      this.handleCallStreaming(call)
    })
  }

  joinMeeting (meetingId: string, localConnectionId: string, localStream: MediaStream) {
    if (this.meetingService.isMemberMeeting(localConnectionId)) {
      this.peerService.call(meetingId, localStream, call => {
        this.handleCallStreaming(call)
      })
    }
  }

  handleConferenceCall (meetingId: string, localStream: MediaStream) {
    socket.conferenceCall.subscribe(meetingId, connectionId => {
      this.notificationService.notifyMember(connectionId)
      if (this.meetingService.canConferenceCall(connectionId)) {
        this.peerService.call(connectionId, localStream, call => {
          this.handleCallStreaming(call)
        })
      }
    })
  }

  handleRemoteDisconnect (meetingId: string) {
    socket.remoteDisconnect.subscribe(meetingId, connectionId => {
      const isHostMeeting = this.meetingService.isHostMeeting(connectionId)
      if (isHostMeeting) this.exitMeeting(meetingId)
      else this.videoService.pullVideo(connectionId)
    })
  }

  handleMeeting () {
    const { history } = this.props
    this.peerService.handleErrors(history)
    this.peerService.onOpen(localConnectionId => {
      this.meetingService.setId(localConnectionId, meetingId => {
        if (meetingId) {
          this.handleRaiseHand(meetingId)
          this.handleMemberRemove(meetingId)
          this.handleDisconnect(meetingId, localConnectionId)
          this.mediaService.getStream(history, localStream => {
            this.handleUserStream(localConnectionId, localStream)
            this.handleReceiveCall(meetingId, localStream)
            this.joinMeeting(meetingId, localConnectionId, localStream)
            this.handleConferenceCall(meetingId, localStream)
            this.handleRemoteDisconnect(meetingId)
          })
        } else this.exitMeeting(meetingId)
      })
    })
  }

  handleEndClick () {
    this.alertService.push('Are you sure to end meeting?', () => {
      this.peerService.disconnect()
    })
  }

  componentDidMount () {
    this.handleMeeting()
  }

  componentWillUnmount () {
    const { id: meetingId } = this.props
    this.exitMeeting(meetingId)
  }

  render () {
    return (
      <IonPage>
        <IonContent fullscreen>
            <div className={styles.meeting}>
              <IonGrid>
                <IonRow>
                  {this.activeVideoCol}
                  <VideoSkeleton video={this.activeVideo} />
                </IonRow>
                <IonRow>
                  {this.videos}
                </IonRow>
              </IonGrid>
              <Actions handleEnd={this.handleEndClick} />
            </div>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(connect(selectors, actions)(Meeting))

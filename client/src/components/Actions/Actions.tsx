import React, { Component } from 'react'
import { isPlatform } from '@ionic/react'
import { SocialSharing } from '@ionic-native/social-sharing'
import copyToClipboard from 'copy-to-clipboard'
import store from '../../store'
import meetingSocket from '../../pages/Meeting/Meeting.socket'
import MediaService from '../../services/MediaService'
import VideoService from '../../services/VideoService'
import AlertService from '../../services/AlertService'
import { selectors as meetingSelectors } from '../../pages/Meeting/Meeting.state'
import { selectors as actionsToggleSelectors } from '../ActionsToggle/ActionsToggle.state'
import Action from '../Action/Action'
import ActionsToggle from '../ActionsToggle/ActionsToggle'
import styles from './Actions.module.scss'

interface ActionsProps {
  handleEnd: () => void
}

interface ActionsState {
  isVideoEnabled: boolean
  isAudioEnabled: boolean
}

export default class Actions extends Component<ActionsProps, ActionsState> {
  protected mediaService: MediaService

  protected videoService: VideoService

  protected alertService: AlertService

  constructor (props: ActionsProps) {
    super(props)
    this.mediaService = new MediaService()
    this.videoService = new VideoService()
    this.alertService = new AlertService()
    this.state = {
      isVideoEnabled: true,
      isAudioEnabled: true
    }
    this.handleInviteClick = this.handleInviteClick.bind(this)
    this.handleRaiseHandClick = this.handleRaiseHandClick.bind(this)
    this.handleEndClick = this.handleEndClick.bind(this)
    this.handleVideoClick = this.handleVideoClick.bind(this)
    this.handleAudioClick = this.handleAudioClick.bind(this)
  }

  get meetingId () {
    const { id } = meetingSelectors(store.getState())
    return id
  }

  get canInvite () {
    return Boolean(this.meetingId)
  }

  get canEnd () {
    return Boolean(this.meetingId)
  }

  get inviteText () {
    const url = `https://${process.env.REACT_APP_HOST}`
    const { id } = meetingSelectors(store.getState())
    return `Hi there,\nYou can join the meeting from ${url}/join?id=${id}`
  }

  get isRaiseHandActive (): boolean {
    const video = this.videoService.getUserVideo()
    return video ? !video.raiseHand : true
  }

  handleInviteClick () {
    if (this.canInvite) {
      if (isPlatform('hybrid')) {
        SocialSharing.share(this.inviteText)
      } else {
        copyToClipboard(this.inviteText)
        this.alertService.push('Invitation copied.')
      }
    }
  }

  handleRaiseHandClick () {
    if (!this.isRaiseHandActive) return
    const { id: meetingId, connectionId } = meetingSelectors(store.getState())
    meetingSocket.raiseHand.publish(meetingId, connectionId)
  }

  handleEndClick () {
    if (this.canEnd) this.props.handleEnd()
  }

  handleVideoClick () {
    const video = this.videoService.getUserVideo()
    if (video) {
      this.mediaService.toggleVideoMute(video.stream, isVideoEnabled => {
        this.setState({ isVideoEnabled })
      })
    }
  }

  handleAudioClick () {
    const video = this.videoService.getUserVideo()
    if (video) {
      this.mediaService.toggleAudioMute(video.stream, isAudioEnabled => {
        this.setState({ isAudioEnabled })
      })
    }
  }

  get canVisibleButtons () {
    const actionsToggleState = actionsToggleSelectors(store.getState())
    return actionsToggleState.expanded
  }

  get buttons () {
    return this.canVisibleButtons &&
      <div className={styles.buttons}>
        <Action
          type="invite"
          active={this.canInvite}
          handleClick={this.handleInviteClick} />
        <Action
          type="raiseHand"
          active={this.isRaiseHandActive}
          handleClick={this.handleRaiseHandClick} />
        <Action
          type="end"
          active={this.canEnd}
          handleClick={this.handleEndClick} />
        <Action
          type="video"
          active={this.state.isVideoEnabled}
          handleClick={this.handleVideoClick} />
        <Action
          type="audio"
          active={this.state.isAudioEnabled}
          handleClick={this.handleAudioClick} />
      </div>
  }

  render () {
    return (
      <div className={styles.actions}>
        <ActionsToggle />
        {this.buttons}
      </div>
    )
  }
}

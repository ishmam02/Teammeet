import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MeetingService from '../../services/MeetingService'
import VideoService from '../../services/VideoService'
import styles from './VideoNative.module.scss'

export interface VideoNativeProps {
  id: string,
  renderId: string
}

interface VideoNativeState {
  renderId: string
}

export default class VideoNative extends Component<VideoNativeProps, VideoNativeState> {
  protected meetingService: MeetingService

  protected videoService: VideoService

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  constructor (props: VideoNativeProps) {
    super(props)
    this.state = {
      renderId: this.props.renderId
    }
    this.meetingService = new MeetingService()
    this.videoService = new VideoService()
  }

  get video () {
    return this.videoService.getVideo(this.props.id)
  }

  get isMuted () {
    return this.meetingService.isUserMeeting(this.props.id)
  }

  setSource (element: HTMLVideoElement | null) {
    if (element && this.video) element.srcObject = this.video.stream
  }

  shouldComponentUpdate (props: VideoNativeProps, state: VideoNativeState) {
    const { renderId } = props
    const hasChange = renderId !== state.renderId
    if (hasChange) this.setState({ renderId })
    return hasChange
  }

  render () {
    return (
      <video
        className={styles.video}
        autoPlay={true}
        muted={this.isMuted}
        playsInline={true}
        ref={video => this.setSource(video)} // Fix blank video
        role="video">
      </video>
    )
  }
}

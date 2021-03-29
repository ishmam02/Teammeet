import React, { Component, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import { handRightOutline, personRemoveOutline } from 'ionicons/icons'
import store from '../../store'
import MeetingService from '../../services/MeetingService'
import { actions } from '../../pages/Meeting/Meeting.state'
import meetingSocket from '../../pages/Meeting/Meeting.socket'
import FloatButton from '../FloatButton/FloatButton'
import VideoNative from '../VideoNative/VideoNative'
import styles from './Video.module.scss'

export interface VideoProps {
  id: string,
  source: MediaStream,
  ratio: 'wide' | 'square',
  raiseHand: boolean,
  memberRemove: boolean,
  active: boolean,
  renderId: string
}

export default class Video extends Component<VideoProps> {
  static propTypes = {
    source: PropTypes.object,
    ratio: PropTypes.oneOf(['wide', 'square']).isRequired,
    raiseHand: PropTypes.bool.isRequired,
    memberRemove: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired
  }

  protected meetingService: MeetingService

  constructor (props: VideoProps) {
    super(props)
    this.meetingService = new MeetingService()
    this.handleClick = this.handleClick.bind(this)
    this.handleMemberRemoveClick = this.handleMemberRemoveClick.bind(this)
  }

  get className () {
    return `${styles.container} ${styles[this.props.ratio]}`
  }

  get raiseHand () {
    return (
      this.props.raiseHand &&
      <div className={styles.raiseHand}>
        <FloatButton
          color="warning"
          icon={handRightOutline}
          role="raiseHand" />
      </div>
    )
  }

  get memberRemove () {
    return (
      this.props.memberRemove &&
      <div
        className={styles.memberRemove}
        onClick={this.handleMemberRemoveClick}>
        <FloatButton
          color="danger"
          icon={personRemoveOutline}
          role="memberRemove" />
      </div>
    )
  }

  handleMemberRemoveClick (event: MouseEvent) {
    event.stopPropagation()
    const meetignId = this.meetingService.getMeetingId()
    meetingSocket.memberRemove.publish(meetignId, this.props.id)
  }

  handleClick () {
    store.dispatch(actions.setVideoActive(this.props.id, true))
  }

  render () {
    return (
      <div
        className={this.className}
        onClick={this.handleClick}
        role="container">
        <div className={styles.content}>
          <VideoNative
            id={this.props.id}
            renderId={this.props.renderId}/>
          {this.raiseHand}
          {this.memberRemove}
        </div>
      </div>
    )
  }
}

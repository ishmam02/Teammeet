import React, { Component } from 'react'
import { IonCard } from '@ionic/react'
import { personRemoveOutline } from 'ionicons/icons'
import PropTypes from 'prop-types'
import moment from 'moment'
import AlertService from '../../services/AlertService'
import Request from './Host.request'
import FloatButton from '../FloatButton/FloatButton'
import styles from './Host.module.scss'

export interface HostProps {
  id: number
  name: string
  username: string
  lastMeetingAt: Date | null
}

export default class Host extends Component<HostProps> {
  protected request: Request

  protected alertService: AlertService

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    lastMeetingAt: PropTypes.string
  }

  constructor (props: HostProps) {
    super(props)
    this.request = new Request()
    this.alertService = new AlertService()
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  get lastMeeting () {
    return this.props.lastMeetingAt
      ? moment(this.props.lastMeetingAt).format('LLL')
      : '-'
  }

  handleDeleteClick () {
    this.alertService.push('Are you sure to delete the host?', () => {
      const host = { id: this.props.id }
      this.request.delete(host)
    })
  }

  render () {
    return (
      <IonCard>
        <div className={styles.host}>
          <div className={styles.user}>
            <h3 className={styles.name}>{this.props.name}</h3>
            <div className={styles.username}>{this.props.username}</div>
            <div className={styles.lastMeeting}>
              <h3 className={styles.heading}>Last Meeting</h3>
              <div className={styles.time}>{this.lastMeeting}</div>
            </div>
          </div>
          <div className={styles.actions}>
            <div onClick={this.handleDeleteClick} >
              <FloatButton
                color="danger"
                icon={personRemoveOutline}
                role="delete" />
            </div>
          </div>
        </div>
      </IonCard>
    )
  }
}

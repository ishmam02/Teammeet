import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IonIcon } from '@ionic/react'
import { alertCircleOutline } from 'ionicons/icons'
import AlertService from '../../services/AlertService'
import { selectors } from './Alert.state'
import styles from './Alert.module.scss'

interface AlertProps {
  message?: string,
  handleProceed?: () => {}
}

class Alert extends Component<AlertProps> {
  protected alertService: AlertService

  constructor (props: AlertProps) {
    super(props)
    this.alertService = new AlertService()
    this.handleClick = this.handleClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleProceedClick = this.handleProceedClick.bind(this)
  }

  get iconAndMessage () {
    return (
      <div className={styles.iconAndMessage}>
        <IonIcon icon={alertCircleOutline} role="icon"/>
        <span className={styles.message}>{this.props.message}</span>
      </div>
    )
  }

  get actions () {
    return (
      this.props.handleProceed &&
      <div className={styles.actions} role="actions">
        <div className={styles.cancel} onClick={this.handleCancelClick}>No</div>
        <div className={styles.proceed} onClick={this.handleProceedClick}>Yes</div>
      </div>
    )
  }

  get alertClass () {
    const cursorStyle = this.props.handleProceed ? '' : styles.cursor
    return `${styles.alert} ${cursorStyle}`
  }

  handleClick () {
    if (!this.props.handleProceed) this.alertService.pull()
  }

  handleCancelClick () {
    this.alertService.pull()
  }

  handleProceedClick () {
    if (this.props.handleProceed) {
      this.props.handleProceed()
      this.alertService.pull()
    }
  }

  render () {
    return (
      this.props.message &&
      <div className={this.alertClass} onClick={this.handleClick}>
        {this.iconAndMessage}
        {this.actions}
      </div>
    )
  }
}

export default connect(selectors, null)(Alert)

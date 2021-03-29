import React, { Component } from 'react'
import { IonFabButton, IonIcon } from '@ionic/react'
import PropTypes from 'prop-types'
import styles from './FloatButton.module.scss'

export interface FloatButtonProps {
  color: 'warning' | 'danger',
  icon: string,
  role: string
}

export default class FloatButton extends Component<FloatButtonProps> {
  static propTypes = {
    color: PropTypes.oneOf(['warning', 'danger']).isRequired,
    icon: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className={styles.floatButton}>
        <IonFabButton
          color={this.props.color}
          size="small"
          role={this.props.role}>
          <IonIcon
            icon={this.props.icon}
            role="icon" />
        </IonFabButton>
      </div>
    )
  }
}

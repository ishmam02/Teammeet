import React, { MouseEvent, Component } from 'react'
import { IonIcon } from '@ionic/react'
import PropTypes from 'prop-types'
import {
  closeCircleOutline,
  handRightOutline,
  micOutline,
  personAddOutline,
  videocamOutline
} from 'ionicons/icons'
import styles from './Action.module.scss'

type Types = 'invite' | 'raiseHand' | 'end' | 'video' | 'audio'

export interface ActionProps {
  type: Types,
  active: boolean,
  handleClick: (event: MouseEvent) => void
}

export default class Action extends Component<ActionProps> {
  static propTypes = {
    type: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
  }

  get className () {
    const activeClass = this.props.active ? styles.active : ''
    return `${styles.action} ${activeClass}`
  }

  get icon () {
    switch (this.props.type) {
      case 'invite':
        return personAddOutline
      case 'raiseHand':
        return handRightOutline
      case 'end':
        return closeCircleOutline
      case 'video':
        return videocamOutline
      case 'audio':
        return micOutline
    }
  }

  render () {
    return (
      <div
        className={this.className}
        role={this.props.type}
        onClick={this.props.handleClick}>
        <IonIcon icon={this.icon} />
      </div>
    )
  }
}

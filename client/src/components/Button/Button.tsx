import React, { MouseEvent, Component } from 'react'
import { IonButton } from '@ionic/react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'

export interface ButtonProps {
  text: string,
  handleClick: (event: MouseEvent) => void
}

export default class Button extends Component<ButtonProps> {
  static propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className={styles.button}>
        <IonButton
          shape="round"
          expand="block"
          onClick={this.props.handleClick}>
          {this.props.text}
        </IonButton>
      </div>
    )
  }
}

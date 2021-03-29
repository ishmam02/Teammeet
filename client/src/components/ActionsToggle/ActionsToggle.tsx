import { IonIcon } from '@ionic/react'
import { chevronDown, chevronUp } from 'ionicons/icons'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import { actions, ActionsToggleState, selectors } from './ActionsToggle.state'
import styles from './ActionsToggle.module.scss'

interface ActionsToggleProps extends ActionsToggleState {}

class ActionsToggle extends Component<ActionsToggleProps> {
  constructor (props: ActionsToggleProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  get icon () {
    return this.props.expanded ? chevronDown : chevronUp
  }

  handleClick () {
    const expanded = !this.props.expanded
    store.dispatch(actions.replaceExpanded(expanded))
  }

  render () {
    return (
      <div className={styles.actionsToggle}>
        <div className={styles.button} onClick={this.handleClick}>
          <IonIcon icon={this.icon} className={styles.icon} />
        </div>
      </div>
    )
  }
}

export default connect(selectors, actions)(ActionsToggle)

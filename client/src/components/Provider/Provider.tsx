import React, { Component } from 'react'
import { IonReactRouter } from '@ionic/react-router'
import { IonRouterOutlet } from '@ionic/react'
import { Provider as ReduxProvider } from 'react-redux'
import PropTypes from 'prop-types'
import store from '../../store'

export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    return (
      <ReduxProvider store={store}>
        <IonReactRouter>
          <IonRouterOutlet>
            {this.props.children}
          </IonRouterOutlet>
        </IonReactRouter>
      </ReduxProvider>
    )
  }
}

import React, { Component, ReactPropTypes } from 'react'
import { Route, Switch } from 'react-router-dom'
import { IonApp, setupConfig } from '@ionic/react'
import routes from '../../routes'
import SocketService from '../../services/SocketService'
import AlertService from '../../services/AlertService'
import LocalStorage from './App.localStorage'
import Provider from '../Provider/Provider'
import '../../theme/bootstrap.scss'

export default class App extends Component {
  protected alertService: AlertService

  protected localStorage: LocalStorage

  constructor (props: ReactPropTypes) {
    super(props)
    this.alertService = new AlertService()
    this.localStorage = new LocalStorage()
    this.setupConfig()
    SocketService.connect()
  }

  setupConfig () {
    setupConfig({
      mode: 'md'
    })
  }

  async promptPwaInstall () {
    const isAlreadyPrompted = await this.localStorage.isPwaAlreadyPrompted()
    if (isAlreadyPrompted) return
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault()
      this.localStorage.setPwaInstallPrompted()
      this.alertService.push('Install app?', async () => {
        let deferredPrompt: any = event
        deferredPrompt.prompt()
        const choiceResult = await deferredPrompt.userChoice
        if (choiceResult.outcome === 'accepted') {
          this.alertService.pull()
        }
        deferredPrompt = null
      })
    })
  }

  componentDidMount () {
    this.promptPwaInstall()
  }

  render () {
    return (
      <IonApp>
        <Provider>
          <Switch>
            <Route
              path={routes.preload.path}
              component={routes.preload.component}
              exact={true} />
            <Route
              path={routes.home.path}
              component={routes.home.component}
              exact={true} />
            <Route
              path={routes.meetingJoin.path}
              component={routes.meetingJoin.component}
              exact={true} />
            <Route
              path={routes.meetingStart.path}
              component={routes.meetingStart.component}
              exact={true} />
            <Route
              path={routes.meeting.path}
              component={routes.meeting.component}
              exact={true} />
            <Route
              path={routes.install.path}
              component={routes.install.component}
              exact={true} />
          
        
            <Route
              path={routes.notFound.path}
              component={routes.notFound.component}
              exact={true} />
          </Switch>
        </Provider>
      </IonApp>
    )
  }
}

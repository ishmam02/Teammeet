import { IonContent, IonPage } from '@ionic/react'
import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Plugins } from '@capacitor/core'
import { includes, startsWith } from 'lodash'
import routes from '../../routes'
import Page from '../../components/Page/Page'

interface PreloadProps extends RouteComponentProps {}

class Preload extends Component<PreloadProps> {
  static timeout: number = 2000

  autoRouteToHome (callback: (timeoutId: number) => void) {
    const timeoutId: number = window.setTimeout(() => {
      this.props.history.push(routes.home.path)
    }, Preload.timeout)
    callback(timeoutId)
  }

  initializeDeeplink (callback: () => void) {
    Plugins.App.addListener('appUrlOpen', (data: any) => {
      const slug = data.url.split(process.env.REACT_APP_HOST).pop()
      const isJoin = startsWith(slug, '/join?id=')
      const isStart = includes(['/start', '/start/'], slug)
      if (isJoin || isStart) {
        this.props.history.push(slug)
        callback()
      }
    })
  }

  componentDidMount () {
    this.autoRouteToHome(timeoutId => {
      this.initializeDeeplink(() => {
        clearTimeout(timeoutId)
      })
    })
  }

  render () {
    return (
      <IonPage>
        <IonContent>
          <Page flip={true} container="small" />
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(Preload)

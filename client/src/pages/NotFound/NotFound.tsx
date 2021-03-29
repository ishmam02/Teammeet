import React, { Component } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { RouteComponentProps, withRouter } from 'react-router'
import routes from '../../routes'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'
import styles from './NotFound.module.scss'

interface NotFoundProps extends RouteComponentProps {}

class NotFound extends Component<NotFoundProps> {
  constructor (props: NotFoundProps) {
    super(props)
    this.handleRouteClick = this.handleRouteClick.bind(this)
  }

  handleRouteClick () {
    this.props.history.push(routes.home.path)
  }

  render () {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Page flip={false} container="small">
            <div className={styles.notFound}>
              <h1 className={styles.heading}>404</h1>
              <p className={styles.description}>Page Not Found</p>
              <Button
                text="Return to Home"
                handleClick={this.handleRouteClick} />
            </div>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(NotFound)

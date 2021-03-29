import { IonContent, IonPage } from '@ionic/react'
import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import routes from '../../routes'
import Button from '../../components/Button/Button'
import Page from '../../components/Page/Page'
import styles from './Home.module.scss'

interface HomeProps extends RouteComponentProps {}

class Home extends Component<HomeProps> {
  constructor (props: HomeProps) {
    super(props)
    this.handleStartClick = this.handleStartClick.bind(this)
    this.handleJoinClick = this.handleJoinClick.bind(this)
  }

  handleStartClick () {
    this.props.history.push(routes.meetingStart.path)
  }

  handleJoinClick () {
    this.props.history.push(routes.meetingJoin.path)
  }

  get copyright () {
    const text = `${process.env.REACT_APP_NAME} ${new Date().getFullYear()}`
    return { __html: `&copy; ${text}` }
  }

  render () {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Page flip={false} container="small">
            <div className={styles.home}>
              <Button
                text="Start a Meeting"
                handleClick={this.handleStartClick} />
              <Button
                text="Join a Meeting"
                handleClick={this.handleJoinClick} />
              <div className={styles.footer}>
                <p
                  className={styles.copyright}
                  dangerouslySetInnerHTML={this.copyright} />
              </div>
            </div>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(Home)

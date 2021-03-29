import React, { ChangeEvent, Component, Fragment } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import Request from './MeetingStart.request'
import { actions, MeetingStartActions } from './MeetingStart.state'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import { Link } from 'react-router-dom'
import styles from './MeetingStart.module.scss'
import routes from '../../routes'

interface MeetingProps extends MeetingStartActions, RouteComponentProps {}

interface MeetingState {
  email: string
  password: string
}

class MeetingStart extends Component<MeetingProps, MeetingState> {
  protected request: Request

  constructor (props: any) {
    super(props)
    this.request = new Request()
    this.state = {
      email: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
  }

  handleInputChange (event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, name } = target
    switch (name) {
      case 'email':
        this.setState({ email: value })
        break
      case 'password':
        this.setState({ password: value })
        break
    }
  }

  handleStartClick () {
    const { email, password } = this.state
    const credentials = { email, password }
    this.request.signIn(credentials, this.props.history)
  }

  render () {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Page flip={false} container="small">
            <div className={styles.home}>
              <Input
                name="email"
                type="email"
                value={this.state.email}
                placeholder="Email"
                handleChange={this.handleInputChange} />
              <Input
                name="password"
                type="password"
                value={this.state.password}
                placeholder="Password"
                handleChange={this.handleInputChange} />
              <Button
                text="Start Meeting"
                handleClick={this.handleStartClick} />
                <div className={styles.footer}>
                <Link to={routes.install.path}>Sign Up</Link>
              </div>
            </div>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(connect(null, actions)(MeetingStart))

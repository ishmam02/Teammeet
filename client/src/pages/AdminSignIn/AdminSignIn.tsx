import React, { ChangeEvent, Component, Fragment } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { RouteComponentProps, withRouter } from 'react-router'
import Request from './AdminSignIn.request'
import Page from '../../components/Page/Page'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

interface AdminSignInProps extends RouteComponentProps {}

interface AdminSignInState {
  username: string
  password: string
}

class AdminSignIn extends Component<AdminSignInProps, AdminSignInState> {
  protected request: Request

  constructor (props: any) {
    super(props)
    this.request = new Request()
    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSignInClick = this.handleSignInClick.bind(this)
  }

  handleInputChange (event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, name } = target
    switch (name) {
      case 'username':
        this.setState({ username: value })
        break
      case 'password':
        this.setState({ password: value })
        break
    }
  }

  handleSignInClick () {
    const { username, password } = this.state
    const credentials = { username, password }
    this.request.signIn(credentials, this.props.history)
  }

  render () {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Page flip={false} container="small">
            <Fragment>
              <Input
                name="username"
                type="text"
                value={this.state.username}
                placeholder="Username"
                handleChange={this.handleInputChange} />
              <Input
                name="password"
                type="password"
                value={this.state.password}
                placeholder="Password"
                handleChange={this.handleInputChange} />
              <Button
                text="Sign In"
                handleClick={this.handleSignInClick} />
            </Fragment>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(AdminSignIn)

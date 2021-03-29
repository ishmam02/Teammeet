import React, { ChangeEvent, Component, Fragment } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { RouteComponentProps, withRouter } from 'react-router'
import Request from './Install.request'
import Page from '../../components/Page/Page'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

interface InstallProps extends RouteComponentProps {}

interface InstallState {
  email: string
  name: string
  password: string
}

class Install extends Component<InstallProps, InstallState> {
  protected request: Request

  constructor (props: any) {
    super(props)
    this.request = new Request()
    this.state = {
      email: '',
      name: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCreateClick = this.handleCreateClick.bind(this)
  }

  handleInputChange (event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, name } = target
    switch (name) {
      case 'email':
        this.setState({ email: value })
        break
      case 'name':
          this.setState({ name: value })
          break  
      case 'password':
        this.setState({ password: value })
        break
    }
  }

  handleCreateClick () {
    const { email,name, password} = this.state
    const admin = { email, name, password };
    this.request.createAdmin(admin, this.props.history)
  }

  render () {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Page flip={false} container="small">
            <Fragment>
              <Input
                name="email"
                type="email"
                value={this.state.email}
                placeholder="Email"
                handleChange={this.handleInputChange} />
                <Input
                name="name"
                type="text"
                value={this.state.name}
                placeholder="Name"
                handleChange={this.handleInputChange} />
              <Input
                name="password"
                type="password"
                value={this.state.password}
                placeholder="Password"
                handleChange={this.handleInputChange} />
              <Button
                text="Sign Up"
                handleClick={this.handleCreateClick} />
            </Fragment>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(Install)

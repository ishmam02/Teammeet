import { IonCol, IonGrid, IonRow } from '@ionic/react'
import React, { ChangeEvent, Component } from 'react'
import copyToClipboard from 'copy-to-clipboard'
import AlertService from '../../services/AlertService'
import Request from './HostCreate.request'
import Button from '../Button/Button'
import Input from '../Input/Input'

interface HostState {
  name: string
  password: string
  username: string
}

export default class HostCreate extends Component<any, HostState> {
  protected request: Request

  protected alertService: AlertService

  constructor (props: any) {
    super(props)
    this.state = {
      name: '',
      password: '',
      username: ''
    }
    this.request = new Request()
    this.alertService = new AlertService()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAddHostClick = this.handleAddHostClick.bind(this)
  }

  handleInputChange (event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, name } = target
    switch (name) {
      case 'name':
        this.setState({ name: value })
        break
      case 'password':
        this.setState({ password: value })
        break
      case 'username':
        this.setState({ username: value })
        break
    }
  }

  copyCredentials () {
    const appUrl = `https://${process.env.REACT_APP_HOST}`
    const username = this.state.username
    const password = this.state.password
    const credentials = `Hi ${this.state.name},\nYou can start a meeting from ${appUrl}/start using the following credentials:\nUsername: ${username}\nPassword: ${password}`
    copyToClipboard(credentials)
    this.alertService.push('Credentials copied.')
  }

  clearForm () {
    this.setState({
      name: '',
      password: '',
      username: ''
    })
  }

  handleAddHostClick () {
    const { name, username, password } = this.state
    const credentials = { name, username, password }
    this.request.createHost(credentials, () => {
      this.copyCredentials()
      this.clearForm()
    })
  }

  render () {
    return (
      <IonGrid>
        <IonRow>
          <IonCol>
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
          </IonCol>
          <IonCol>
            <Input
              name="username"
              type="text"
              value={this.state.username}
              placeholder="Username"
              handleChange={this.handleInputChange} />
            <Button
              text="Add Host"
              handleClick={this.handleAddHostClick} />
          </IonCol>
        </IonRow>
      </IonGrid>
    )
  }
}

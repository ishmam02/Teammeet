import { IonContent, IonPage } from '@ionic/react'
import React, { ChangeEvent, Component, Fragment } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { connect } from 'react-redux'
import { trim } from 'lodash'
import qs from 'qs'
import routes from '../../routes'
import AlertService from '../../services/AlertService'
import { actions, MeetingJoinActions } from './MeetingJoin.state'
import Page from '../../components/Page/Page'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

interface MeetingProps extends MeetingJoinActions, RouteComponentProps {}

interface MeetingState {
  meetingId: string
}

class MeetingJoin extends Component<MeetingProps, MeetingState> {
  protected alertService: AlertService

  constructor (props: any) {
    super(props)
    this.state = {
      meetingId: ''
    }
    this.alertService = new AlertService()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleJoinClick = this.handleJoinClick.bind(this)
  }

  handleInputChange (event: ChangeEvent) {
    const target = event.target as HTMLInputElement
    const { value, name } = target
    if (name === 'meetingId') this.setState({ meetingId: value })
  }

  handleJoinClick () {
    const meetingId = trim(this.state.meetingId)
    if (!meetingId) {
      const message = 'Meeting ID is not allowed to be empty'
      return this.alertService.push(message)
    }
    this.props.replaceMeetingId(meetingId)
    this.props.history.push(routes.meeting.path)
  }

  setMeetingId () {
    const { search } = this.props.history.location
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    const meetingId = query.id as string
    if (meetingId) this.setState({ meetingId })
  }

  componentDidMount () {
    this.setMeetingId()
  }

  render () {
    return (
      <IonPage>
        <IonContent>
          <Page flip={false} container="small">
            <Fragment>
              <Input
                name="meetingId"
                type="text"
                value={this.state.meetingId}
                placeholder="Meeting ID"
                handleChange={this.handleInputChange} />
              <Button
                text="Join Meeting"
                handleClick={this.handleJoinClick} />
            </Fragment>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(connect(null, actions)(MeetingJoin))

import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { isEmpty, range } from 'lodash'
import Request from './Hosts.request'
import AdminMiddleware from '../../middleware/AdminMiddleware'
import { selectors, HostState, HostsState } from './Hosts.state'
import HostSkeleton from '../../components/HostSkeleton/HostSkeleton'
import Page from '../../components/Page/Page'
import HostCreate from '../../components/HostCreate/HostCreate'
import Host from '../../components/Host/Host'
import AdminMenu from '../../components/AdminMenu/AdminMenu'

interface HostsProps extends RouteComponentProps, HostsState {}

class Hosts extends Component<HostsProps> {
  protected request: Request

  protected adminMiddleware: AdminMiddleware

  constructor (props: HostsProps) {
    super(props)
    this.request = new Request()
    this.adminMiddleware = new AdminMiddleware()
    this.adminMiddleware.auth(this.props.history)
  }

  get hosts () {
    const { hosts } = this.props
    return hosts.map(host => this.host(host))
  }

  get hostsSkeleton () {
    const { hosts } = this.props
    if (isEmpty(hosts)) {
      const hostsSkeleton = range(2)
      return hostsSkeleton.map(host => this.hostSkeleton(host))
    }
  }

  hostSkeleton (host: any) {
    return (
      <IonCol
        size="12"
        sizeSm="6"
        key={host}>
        <HostSkeleton />
      </IonCol>
    )
  }

  host (host: HostState) {
    return (
      <IonCol
        size="12"
        sizeSm="6"
        key={host.username}>
        <Host
          id={host.id}
          name={host.name}
          username={host.username}
          lastMeetingAt={host.lastMeetingAt} />
      </IonCol>
    )
  }

  componentDidMount () {
    this.request.listHosts()
  }

  render () {
    return (
      <IonPage>
        <IonContent>
          <Page flip={false} container="large">
            <Fragment>
              <AdminMenu />
              <HostCreate />
              <IonGrid>
                <IonRow>
                  {this.hosts}
                  {this.hostsSkeleton}
                </IonRow>
              </IonGrid>
            </Fragment>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}

export default withRouter(connect(selectors, null)(Hosts))

import store from '../../store'
import RequestService from '../../services/RequestService'
import { actions } from './Hosts.state'

export default class HostsRequest {
  protected requestService: RequestService

  constructor () {
    this.requestService = new RequestService()
  }

  listHosts () {
    this.requestService.get('/hosts', hosts => {
      if (hosts) store.dispatch(actions.replaceHosts(hosts))
    })
  }
}

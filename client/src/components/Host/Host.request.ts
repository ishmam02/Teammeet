import store from '../../store'
import RequestService from '../../services/RequestService'
import { actions as hostsActions } from '../../pages/Hosts/Hosts.state'

interface DeleteHostData {
  id: number
}

export default class HostRequest {
  protected requestService: RequestService

  constructor () {
    this.requestService = new RequestService()
  }

  delete (host: DeleteHostData) {
    this.requestService.delete('/host', host, response => {
      if (response) {
        store.dispatch(hostsActions.pullHost(host.id))
      }
    })
  }
}

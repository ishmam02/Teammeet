import store from '../../store'
import RequestService from '../../services/RequestService'
import { actions as hostsActions } from '../../pages/Hosts/Hosts.state'

interface CreateHostData {
  name: string
  username: string
  password: string
}

export default class HostCreateRequest {
  protected requestService: RequestService

  constructor () {
    this.requestService = new RequestService()
  }

  createHost (host: CreateHostData, callback: () => void) {
    this.requestService.post('/host', host, response => {
      if (response) {
        store.dispatch(hostsActions.pushHost(response))
        callback()
      }
    })
  }
}

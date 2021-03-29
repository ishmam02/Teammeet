import RequestService from '../../services/RequestService'
import AlertService from '../../services/AlertService'

export default class PrivacyEditRequest {
  protected requestService: RequestService

  protected alertService: AlertService

  constructor () {
    this.requestService = new RequestService()
    this.alertService = new AlertService()
  }

  read (callback: (body: string) => void) {
    this.requestService.get('/privacy', response => {
      if (response) callback(response.body)
    })
  }

  update (body: string) {
    this.requestService.post('/privacy', { body }, response => {
      if (response) this.alertService.push('Privacy updated.')
    })
  }
}

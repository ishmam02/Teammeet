import { History } from 'history'
import routes from '../../routes'
import RequestService from '../../services/RequestService'

interface CreateAdminData {
  email: string,
  name: string,
  password: string,
}

export default class InstallRequest {
  protected requestService: RequestService

  constructor () {
    this.requestService = new RequestService()
  }

  createAdmin (admin: CreateAdminData, history: History) {
    this.requestService.post('/api/auth/signup', admin, response => {
      if (response) history.push(routes.meetingStart.path)
    })
  }
}

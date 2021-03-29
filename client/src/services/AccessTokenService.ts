import StorageService from './StorageService'

export default class AccessTokenService {
  protected key: string = 'accessToken'

  protected storageService: StorageService

  constructor () {
    this.storageService = new StorageService()
  }

  get (): Promise<string | null> {
    return this.storageService.get(this.key)
  }

  set (accessToken: string): Promise<void> {
    return this.storageService.set(this.key, accessToken)
  }

  remove () {
    return this.storageService.remove(this.key)
  }
}

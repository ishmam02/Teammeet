import StorageService from '../../services/StorageService'

export default class AppLocalStorage {
  protected storageService: StorageService

  protected pwaInstallPrompted: string = 'pwaInstallPrompted'

  constructor () {
    this.storageService = new StorageService()
  }

  async isPwaAlreadyPrompted (): Promise<boolean> {
    const pwaInstallPrompted = await this.storageService
      .get(this.pwaInstallPrompted)
    return pwaInstallPrompted ? Boolean(JSON.parse(pwaInstallPrompted)) : false
  }

  setPwaInstallPrompted (): void {
    this.storageService.set(this.pwaInstallPrompted, JSON.stringify(true))
  }
}

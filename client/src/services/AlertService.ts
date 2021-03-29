import store from '../store'
import {
  actions as alertActions,
  selectors as alertSelectors
} from '../components/Alert/Alert.state'

export default class AlertService {
  protected static timeout: number = 5000

  protected clearAutoClose (): void {
    const { timeoutId } = alertSelectors(store.getState())
    clearTimeout(timeoutId)
    store.dispatch(alertActions.replaceTimeoutId(0))
  }

  protected setAutoClose (): void {
    const timeoutId: number = window.setTimeout(() => {
      store.dispatch(alertActions.replaceMessage(''))
      this.clearAutoClose()
    }, AlertService.timeout)
    store.dispatch(alertActions.replaceTimeoutId(timeoutId))
  }

  push (message: string, handleProceed?: () => void): void {
    this.pull()
    store.dispatch(alertActions.replaceMessage(message))
    if (handleProceed) {
      store.dispatch(alertActions.replaceHandleProceed(handleProceed))
    } else this.setAutoClose()
  }

  pull () {
    this.clearAutoClose()
    store.dispatch(alertActions.replaceMessage(''))
    store.dispatch(alertActions.replaceHandleProceed(null))
  }
}

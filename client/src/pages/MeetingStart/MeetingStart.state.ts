import { actions as appActions, AuthState } from '../../components/App/App.state'

export interface MeetingStartActions {
  replaceAppAuth: (auth: AuthState) => {
    type: string;
    auth: AuthState;
  }
}

export const actions: MeetingStartActions = {
  replaceAppAuth (auth) {
    return appActions.replaceAuth(auth)
  }
}

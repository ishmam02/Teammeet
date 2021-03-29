import { cloneDeep } from 'lodash'

export interface AuthState {
  type: 'admin' | 'host' | null
}

interface AppState {
  auth: AuthState
}

const app: AppState = {
  auth: {
    type: null
  }
}

export const actions = {
  replaceAuth (auth: AuthState) {
    return { type: 'REPLACE_APP_AUTH', auth }
  }
}

export function reducers (state = app, action: any) {
  switch (action.type) {
    case 'REPLACE_APP_AUTH':
      app.auth = action.auth
      return cloneDeep(app)
    default:
      return state
  }
}

export function selectors (state: { app: AppState }) {
  return cloneDeep(state.app)
}

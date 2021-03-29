import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducers as app } from './components/App/App.state'
import { reducers as alert } from './components/Alert/Alert.state'
import { reducers as meeting } from './pages/Meeting/Meeting.state'
import { reducers as actionsToggle } from './components/ActionsToggle/ActionsToggle.state'

const reducers = combineReducers({
  app,
  alert,
  meeting,
  actionsToggle
})

export default createStore(reducers, composeWithDevTools(applyMiddleware()))

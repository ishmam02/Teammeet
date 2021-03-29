import { cloneDeep } from 'lodash'

export interface ActionsToggleState {
  expanded: boolean
}

const actionsToggle: ActionsToggleState = {
  expanded: true
}

export const actions = {
  replaceExpanded (expanded: boolean) {
    return { type: 'REPLACE_ACTIONS_TOGGLE_EXPANDED', expanded }
  }
}

export function reducers (state = actionsToggle, action: any) {
  switch (action.type) {
    case 'REPLACE_ACTIONS_TOGGLE_EXPANDED':
      actionsToggle.expanded = action.expanded
      return cloneDeep(actionsToggle)
    default:
      return state
  }
}

export function selectors (state: { actionsToggle: ActionsToggleState }) {
  return cloneDeep(state.actionsToggle)
}

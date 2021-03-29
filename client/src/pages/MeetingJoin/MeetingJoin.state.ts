import { actions as meetingActions } from '../Meeting/Meeting.state'

export interface MeetingJoinActions {
  replaceMeetingId: (id: string) => {
    type: string;
    id: string;
  }
}

export const actions: MeetingJoinActions = {
  replaceMeetingId (id: string) {
    return meetingActions.replaceId(id)
  }
}

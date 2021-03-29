import { cloneDeep, find, reject, some } from 'lodash'

export interface VideoState {
  id: string,
  stream: MediaStream,
  raiseHand: boolean,
  memberRemove: boolean,
  active: boolean,
  renderId: string
}

export interface MeetingState {
  id: string,
  connectionId: string,
  videos: VideoState[]
}

const meeting: MeetingState = {
  id: '',
  connectionId: '',
  videos: []
}

export const actions = {
  replaceId (id: string) {
    return { type: 'REPLACE_MEETING_ID', id }
  },
  replaceConnectionId (connectionId: string) {
    return { type: 'REPLACE_MEETING_CONNECTION_ID', connectionId }
  },
  replaceVideos (videos: VideoState[]) {
    return { type: 'REPLACE_MEETING_VIDEOS', videos }
  },
  setVideoRaiseHand (connectionId: string, raiseHand: boolean) {
    const payload = { connectionId, raiseHand }
    return { type: 'SET_MEETING_VIDEO_RAISE_HAND', payload }
  },
  setVideoActive (connectionId: string, active: boolean) {
    const payload = { connectionId, active }
    return { type: 'SET_MEETING_VIDEO_ACTIVE', payload }
  },
  pushVideo (video: VideoState) {
    return { type: 'PUSH_MEETING_VIDEO', video }
  },
  pullVideo (connectionId: string) {
    return { type: 'PULL_MEETING_VIDEO', connectionId }
  },
  reset () {
    return { type: 'RESET_MEETING' }
  }
}

export function reducers (state = meeting, action: any) {
  switch (action.type) {
    case 'REPLACE_MEETING_ID':
      meeting.id = action.id
      return cloneDeep(meeting)
    case 'REPLACE_MEETING_CONNECTION_ID':
      meeting.connectionId = action.connectionId
      return cloneDeep(meeting)
    case 'REPLACE_MEETING_VIDEOS':
      meeting.videos = action.videos
      return cloneDeep(meeting)
    case 'SET_MEETING_VIDEO_RAISE_HAND': {
      const { connectionId, raiseHand } = action.payload
      const video = find(meeting.videos, { id: connectionId })
      if (video) { video.raiseHand = raiseHand }
      return cloneDeep(meeting)
    }
    case 'SET_MEETING_VIDEO_ACTIVE': {
      const { connectionId, active } = action.payload
      const activeVideo = find(meeting.videos, { active })
      const targetVideo = find(meeting.videos, { id: connectionId })
      if (activeVideo) { activeVideo.active = !active }
      if (targetVideo) { targetVideo.active = active }
      return cloneDeep(meeting)
    }
    case 'PUSH_MEETING_VIDEO': {
      const isExists = some(meeting.videos, { id: action.video.id })
      if (!isExists) meeting.videos.push(action.video)
      return cloneDeep(meeting)
    }
    case 'PULL_MEETING_VIDEO': {
      const { connectionId: id } = action
      const isExists = some(meeting.videos, { id })
      if (isExists) {
        meeting.videos = reject(meeting.videos, { id })
      }
      return cloneDeep(meeting)
    }
    case 'RESET_MEETING': {
      meeting.id = ''
      meeting.connectionId = ''
      meeting.videos = []
      return cloneDeep(meeting)
    }
    default:
      return state
  }
}

export function selectors (state: { meeting: MeetingState }) {
  return cloneDeep(state.meeting)
}

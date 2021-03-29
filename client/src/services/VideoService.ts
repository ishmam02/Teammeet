import { find, some } from 'lodash'
import { nanoid } from 'nanoid'
import store from '../store'
import MeetingService from './MeetingService'
import MediaService from './MediaService'
import {
  actions as meetingActions,
  selectors as meetingSelectors,
  VideoState
} from '../pages/Meeting/Meeting.state'

export default class VideoService {
  protected meetingService: MeetingService

  protected mediaService: MediaService

  constructor () {
    this.meetingService = new MeetingService()
    this.mediaService = new MediaService()
  }

  hasVideo (connectionId: string): boolean {
    const { videos } = meetingSelectors(store.getState())
    return some(videos, { id: connectionId })
  }

  createVideo (
    connectionId: string,
    stream: MediaStream,
    callback: (video: VideoState) => void): void {
    const video = {
      id: connectionId,
      stream,
      raiseHand: false,
      memberRemove: this.meetingService.canMemberRemove(connectionId),
      active: this.meetingService.isHostMeeting(connectionId),
      renderId: nanoid()
    }
    callback(video)
  }

  getVideo (connectionId: string): VideoState | undefined {
    const { videos } = meetingSelectors(store.getState())
    return find(videos, video => video.id === connectionId)
  }

  getUserVideo (): VideoState | undefined {
    const { connectionId } = meetingSelectors(store.getState())
    return this.getVideo(connectionId)
  }

  pushVideo (video: VideoState): void {
    store.dispatch(meetingActions.pushVideo(video))
  }

  pullVideo (connectionId: string): void {
    store.dispatch(meetingActions.pullVideo(connectionId))
  }

  stopUserVideo () {
    const userVideo = this.getUserVideo()
    if (userVideo) this.mediaService.stopStream(userVideo.stream)
  }
}

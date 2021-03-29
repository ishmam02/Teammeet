import { History } from 'history'
import { first, forEach } from 'lodash'
import routes from '../routes'
import AlertService from './AlertService'

export default class MediaService {
  protected alertService: AlertService

  constructor () {
    this.alertService = new AlertService()
  }

  async getStream (history: History, callback: (localStream: MediaStream) => void): Promise<void> {
    try {
      const { getUserMedia } = navigator.mediaDevices
      const constraints = { video: true, audio: true }
      const localStream: MediaStream = await getUserMedia(constraints)
      callback(localStream)
    } catch (error) {
      this.alertService.push('Device doesn\'t support WebRTC')
      // history.push(routes.home.path)
    }
  }

  stopStream (localStream: MediaStream): void {
    const tracks = localStream.getTracks()
    forEach(tracks, track => track.stop())
  }

  toggleVideoMute (
    stream: MediaStream,
    callback: (enabled: boolean) => void): void {
    const track = first(stream.getVideoTracks())
    if (track) track.enabled = !track.enabled
    const enabled = track ? track.enabled : false
    callback(enabled)
  }

  toggleAudioMute (
    stream: MediaStream,
    callback: (enabled: boolean) => void): void {
    const track = first(stream.getAudioTracks())
    if (track) track.enabled = !track.enabled
    const enabled = track ? track.enabled : false
    callback(enabled)
  }
}

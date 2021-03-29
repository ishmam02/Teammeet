import SocketService from '../../services/SocketService'

export default {
  raiseHand: {
    channel (meetingId: string) {
      return `/raiseHand/${meetingId}`
    },
    subscribe (meetingId: string, callback: (connectionId: string) => void) {
      SocketService.subscribe(
        this.channel(meetingId),
        (connectionId: string) => callback(connectionId)
      )
    },
    unsubscribe (meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId))
    },
    publish (meetingId: string, connectionId: string) {
      SocketService.publish(this.channel(meetingId), connectionId)
    }
  },

  conferenceCall: {
    channel (meetingId: string) {
      return `/conferenceCall/${meetingId}`
    },
    subscribe (meetingId: string, callback: (connectionId: string) => void) {
      SocketService.subscribe(
        this.channel(meetingId),
        (connectionId: string) => callback(connectionId))
    },
    unsubscribe (meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId))
    },
    publish (meetingId: string, connectionId: string) {
      SocketService.publish(this.channel(meetingId), connectionId)
    }
  },

  remoteDisconnect: {
    channel (meetingId: string) {
      return `/remoteDisconnect/${meetingId}`
    },
    subscribe (meetingId: string, callback: (connectionId: string) => void) {
      SocketService.subscribe(
        this.channel(meetingId),
        (connectionId: string) => callback(connectionId)
      )
    },
    unsubscribe (meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId))
    },
    publish (meetingId: string, connectionId: string) {
      SocketService.publish(this.channel(meetingId), connectionId)
    }
  },

  memberRemove: {
    channel (meetingId: string) {
      return `/memberRemove/${meetingId}`
    },
    subscribe (meetingId: string, callback: (connectionId: string) => void) {
      SocketService.subscribe(
        this.channel(meetingId),
        (connectionId: string) => callback(connectionId))
    },
    unsubscribe (meetingId: string) {
      SocketService.unsubscribe(this.channel(meetingId))
    },
    publish (meetingId: string, connectionId: string) {
      SocketService.publish(this.channel(meetingId), connectionId)
    }
  }
}

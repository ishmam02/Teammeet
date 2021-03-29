import Faye from 'faye';

export default class SocketServer {
	constructor(server) {
		this.server = server;
	}

	attach() {
		const socket = new Faye.NodeAdapter({ mount: '/socket' });
		socket.attach(this.server);
	}
}

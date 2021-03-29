import { ExpressPeerServer } from 'peer';
import { nanoid } from 'nanoid';

export default class PeerServer {
	config = {
		debug: true,
		path: '/',
		generateClientId: () => nanoid(11)
	};

	constructor(server, app) {
		this.server = server;
		this.app = app;
	}

	attach() {
		const peerServer = ExpressPeerServer(this.server, this.config);
		this.app.use('/peer', peerServer);
	}
}

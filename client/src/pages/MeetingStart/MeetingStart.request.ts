import { History } from 'history';
import routes from '../../routes';
import store from '../../store';
import RequestService from '../../services/RequestService';
import { AuthState, actions as appActions } from '../../components/App/App.state';

interface SignInCredentials {
	email: string;
	password: string;
}


export default class MeetingStartRequest {
	protected requestService: RequestService;


	constructor() {
		this.requestService = new RequestService();
	}

	signIn(credentials: SignInCredentials, history: History) {
		this.requestService.post('/api/auth/signin', credentials, async (response) => {
			if (response) {
				const auth: AuthState = { type: 'host' };
				store.dispatch(appActions.replaceAuth(auth));
				history.push(routes.meeting.path);
				}
		});
	}
}

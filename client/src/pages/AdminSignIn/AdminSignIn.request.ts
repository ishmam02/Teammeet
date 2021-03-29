import { History } from 'history';
import routes from '../../routes';
import RequestService from '../../services/RequestService';
import AccessTokenService from '../../services/AccessTokenService';

interface SignInCredentials {
	username: string;
	password: string;
}

export default class AdminSignInRequest {
	protected requestService: RequestService;

	protected accessTokenService: AccessTokenService;

	constructor() {
		this.requestService = new RequestService();
		this.accessTokenService = new AccessTokenService();
	}

	signIn(credentials: SignInCredentials, history: History) {
		this.requestService.post('/admin/signIn', credentials, async (response) => {
			if (response) {
				const { accessToken } = response;
				await this.accessTokenService.set(accessToken);
				history.push(routes.home.path);
			}
		});
	}
}

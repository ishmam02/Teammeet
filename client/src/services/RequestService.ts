import axios from 'axios';
import AlertService from './AlertService';

export default class RequestService {
	protected alertService: AlertService;

	constructor() {
		this.alertService = new AlertService();
	}

	protected async client() {
		return axios.create({
			baseURL: `https://teammeet.herokuapp.com`
		});
	}

	protected handleError(error: any) {
		const serverError = error.response && error.response.data.message;
		const message = serverError || error.message;
		this.alertService.push(message);
	}

	async get(path: string, callback: ((data: any) => void)) {
		const client = await this.client();
		client.get(path).then((response) => callback(response.data)).catch((error) => {
			callback(null);
			this.handleError(error);
		});
	}

	async post(path: string, payload: any, callback: ((data: any) => void)) {
		const client = await this.client();
		client.post(path, payload).then((response) => callback(response.data)).catch((error) => {
			callback(null);
			this.handleError(error);
		});
	}

	async patch(path: string, payload: any, callback: ((data: object | null) => void)) {
		const client = await this.client();
		client.patch(path, payload).then((response) => callback(response.data)).catch((error) => {
			callback(null);
			this.handleError(error);
		});
	}

	async delete(path: string, payload: any, callback: ((data: object | null) => void)) {
		const client = await this.client();
		client.delete(path, { data: payload }).then((response) => callback(response.data)).catch((error) => {
			callback(null);
			this.handleError(error);
		});
	}
}

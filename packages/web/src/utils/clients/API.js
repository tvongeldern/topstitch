import axios from 'axios';
import Cookies from 'universal-cookie';
import {
	AUTH_TOKEN_COOKIE_NAME,
	EMPTY_OBJECT,
	config,
} from '@constants';

const { API_HOST } = config;

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

function parseSuccessResponse({ data } = EMPTY_OBJECT) {
	return data;
}

function parseErrorResponse({
	response: {
		data = EMPTY_OBJECT,
	} = EMPTY_OBJECT,
} = EMPTY_OBJECT) {
	return Promise.reject(data);
}

export function API({ req }) {
	const instance = axios.create({
		headers,
		timeout: 30000,
		baseURL: API_HOST,
	});
	instance.interceptors.response.use(parseSuccessResponse, parseErrorResponse);
	const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
	instance.interceptors.request.use((requestConfig) => ({
		...requestConfig,
		headers: {
			...requestConfig.headers,
			Authorization: `Bearer ${cookies.get(AUTH_TOKEN_COOKIE_NAME)}`,
		},
	}));
	return instance;
}
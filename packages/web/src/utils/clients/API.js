import axios from 'axios';
import {
	AUTH_COOKIE_PATTERN,
	EMPTY_OBJECT,
	config,
} from '@constants';

const { CLIENT_API_HOST, DOCKER_API_HOST } = config;

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

function parseSuccessResponse({ data } = EMPTY_OBJECT) {
	return data;
}

function parseErrorResponse(error = '') {
	const errorString = (error.response && error.response.data && error.response.data.message)
		|| error.message
		|| error.code
		|| 'An HTTP error occurred';
	return Promise.reject(errorString);
}

function findAuthCookie(cookieName) {
	return AUTH_COOKIE_PATTERN.test(cookieName);
}

function getAuthHeader(cookies) {
	const authCookie = Object.keys(cookies.getAll())
		.find(findAuthCookie);
	return `Bearer ${cookies.get(authCookie)}`;
}

function authHeaderInterceptor({ cookies }) {
	return function authInterceptor(requestConfig) {
		return {
			...requestConfig,
			headers: {
				...requestConfig.headers,
				Authorization: getAuthHeader(cookies),
			},
		};
	};
}

function refreshTokenInterceptor({ auth }) {
	if (auth) {
		return async function refreshInterceptor(requestConfig) {
			await auth.refresh();
			return requestConfig;
		};
	}
	return (requestConfig) => requestConfig;
}

export function API({ auth, cookies, isClient }) {
	// Apply base Axios settings
	const instance = axios.create({
		headers,
		timeout: 30000,
		baseURL: isClient ? CLIENT_API_HOST : DOCKER_API_HOST,
	});
	// Format responses
	instance.interceptors.response.use(parseSuccessResponse, parseErrorResponse);
	// Get token from cookies if present, and attach as auth header
	instance.interceptors.request.use(authHeaderInterceptor({ cookies }));
	// Refresh token if expired
	instance.interceptors.request.use(refreshTokenInterceptor({ auth }));
	return instance;
}

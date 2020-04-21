import Amplify, { Auth as AmplifyAuth, Cache } from 'aws-amplify';
import Cookies from 'universal-cookie';
import { AUTH_TOKEN_COOKIE_NAME, config } from '@constants';

Amplify.configure({ Auth: config.cognito });

export function Auth({ req } = {}) {
	const client = this;
	const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();

	this.login = async function login({ email, password }) {
		const signedInUser = await AmplifyAuth.signIn(email, password);
		const jwtToken = signedInUser?.signInUserSession?.idToken?.jwtToken;
		if (!jwtToken) {
			throw new Error('Authentication not completed'); // Shows in login form when thrown
		}
		cookies.set(AUTH_TOKEN_COOKIE_NAME, jwtToken, config.cookies);
		return signedInUser;
	};

	this.logout = async function logout() {
		try {
			cookies.remove(AUTH_TOKEN_COOKIE_NAME, config.cookies);
			cookies.remove(AUTH_TOKEN_COOKIE_NAME);
			const response = await AmplifyAuth.signOut({ global: true });
			Cache.clear();
			return response;
		} catch (error) {
			Cache.clear();
			return Promise.reject(error);
		}
	};

	this.signUp = async function signUp({ email, password }) {
		const signedUpUser = await AmplifyAuth.signUp({
			password,
			username: email,
		});
		return signedUpUser;
	};

	this.forgotPassword = async function forgotPassword(email) {
		const confirmation = await AmplifyAuth.forgotPassword(email);
		return confirmation;
	};

	this.forgotPasswordSubmit = async function forgotPasswordSubmit(email, code, newPassword) {
		await AmplifyAuth.forgotPasswordSubmit(email, code, newPassword);
		const signedInUser = await client.login({ email, password: newPassword });
		return signedInUser;
	};

	this.resendSignUp = async function resendSignUp(username) {
		const resentCodeDetails = await AmplifyAuth.resendSignUp(username);
		return resentCodeDetails;
	};
}

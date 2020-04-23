import Amplify, { Auth as AmplifyAuth, Cache } from 'aws-amplify';
import Cookies from 'universal-cookie';
import { AUTH_TOKEN_COOKIE_NAME, config } from '@constants';

Amplify.configure({ Auth: config.cognito });

export function Auth({ req } = {}) {
	const client = this;
	const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();

	this.logIn = async function login({ email, password }) {
		const data = await AmplifyAuth.signIn(email, password);
		const jwtToken = data?.signInUserSession?.idToken?.jwtToken;
		if (!jwtToken) {
			throw new Error('Authentication not completed'); // Shows in login form when thrown
		}
		cookies.set(AUTH_TOKEN_COOKIE_NAME, jwtToken, config.cookies);
		return { data };
	};

	this.logout = async function logout() {
		cookies.remove(AUTH_TOKEN_COOKIE_NAME, config.cookies);
		cookies.remove(AUTH_TOKEN_COOKIE_NAME);
		Cache.clear();
		const data = await AmplifyAuth.signOut({ global: true });
	};

	this.signUp = async function signUp({ email, password }) {
		const data = await AmplifyAuth.signUp({
			password,
			username: email,
			attributes: { email },
		});
		return { data };
	};

	this.forgotPassword = async function forgotPassword(email) {
		const data = await AmplifyAuth.forgotPassword(email);
		return { data };
	};

	this.forgotPasswordSubmit = async function forgotPasswordSubmit(email, code, newPassword) {
		await AmplifyAuth.forgotPasswordSubmit(email, code, newPassword);
		const data = await client.login({ email, password: newPassword });
		return { data };
	};

	this.resendSignUp = async function resendSignUp(username) {
		const data = await AmplifyAuth.resendSignUp(username);
		return { data };
	};
}

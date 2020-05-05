import Amplify, { Auth as AmplifyAuth } from 'aws-amplify';
import { EMPTY_FUNCTION } from '@utils';
import { config } from '@constants';

function CookiesStorage({ cookies }) {
	this.setItem = (...args) => {
		cookies.set(...args, config.cookies);
	};

	this.getItem = (...args) => cookies.get(...args);

	this.removeItem = (...args) => {
		cookies.remove(...args);
	};

	this.clear = () => {
		Object.keys(cookies.getAll()).forEach(this.removeItem);
	}
}

export function Auth({ cookies } = {}) {
	const client = this;
	this.storage = new CookiesStorage({ cookies });
	this.config = Amplify.configure({
		Auth: {
			...config.cognito,
			storage: client.storage,
		},
	});

	this.logIn = async function login({ email, password }) {
		const data = await AmplifyAuth.signIn(email, password);
		return { data };
	};

	this.logout = async function logout() {
		const data = await AmplifyAuth.signOut({ global: true });
		storage.clear();
		return { data };
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

	this.refresh = async function refreshAuth() {
		const data = await AmplifyAuth.currentSession().catch(EMPTY_FUNCTION);
		return { data };
	};
}

import { Auth as Amplify } from 'aws-amplify';
import { EMPTY_FUNCTION  } from '@utils';
import { config } from '@constants';

function CookiesStorage({ cookies }) {
	this.setItem = (...args) => {
		cookies.set(...args, config.cookies);
	};

	this.getItem = (...args) => cookies.get(...args);

	this.removeItem = (cookieName) => {
		cookies.remove(cookieName);
	};

	this.clear = () => {
		Object.keys(cookies.getAll()).forEach(this.removeItem);
	}
}

export function Auth({ cookies } = {}) {
	const client = this;
	this.storage = new CookiesStorage({ cookies });
	this.config = Amplify.configure({
		...config.cognito,
		storage: client.storage,
	});

	this.logIn = async function login({ email, password }) {
		const data = await Amplify.signIn(email, password);
		return { data };
	};

	this.logout = async function logout() {
		try {
			const data = await Amplify.signOut({ global: true });
			client.storage.clear();
			return { data };
		} catch (error) {
			client.storage.clear();
			return null;
		}
	};

	this.signUp = async function signUp({ email, password }) {
		const data = await Amplify.signUp({
			password,
			username: email,
			attributes: { email },
		});
		return { data };
	};

	this.forgotPassword = async function forgotPassword(email) {
		const data = await Amplify.forgotPassword(email);
		return { data };
	};

	this.forgotPasswordSubmit = async function forgotPasswordSubmit(
		email,
		code,
		newPassword,
	) {
		await Amplify.forgotPasswordSubmit(email, code, newPassword);
		const data = await client.login({ email, password: newPassword });
		return { data };
	};

	this.refresh = async function refreshAuth() {
		const data = await Amplify.currentSession().catch(EMPTY_FUNCTION);
		return { data };
	};
}

import { Account } from '@models';

export async function createAccount(request, response, next) {
	const { token } = request;
	if (!token) {
		return next({
			status: 403,
			message: 'Could not create account from this request',
		});
	}
	try {
		const {
			email,
			sub: cognitoId,
		} = token;
		const account = new Account({ email, cognitoId });
		const saved = await account.save();
		const json = saved.toJSON();
		return response.send(json);
	} catch (error) {
		return next({ error });
	}
}

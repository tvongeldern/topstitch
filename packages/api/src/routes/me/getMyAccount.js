import { Account } from '@models';

export async function getMyAccount({ account }, response, errorHandler) {
	try {
		const myAccount = await Account.findByPk(account.id);
		if (!myAccount) {
			return errorHandler({
				message: 'Account not found',
				status: 400,
			});
		}
		const json = myAccount.toJSON();
		return response.send(json);
	} catch (error) {
		return errorHandler({ error });
	}
}

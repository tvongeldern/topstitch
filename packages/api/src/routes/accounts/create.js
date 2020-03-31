import { Account } from '@models';

export default async function createAccount({ body, logger }, response) {
	try {
		const account = new Account(body);
		const savedAccount = await account.save();
		const json = await savedAccount.toJSON();
		response.send(json);
	} catch (error) {
		logger.error(error);
		response.status(400).send({
			message: 'Error creating account',
			error,
		});
	}
}

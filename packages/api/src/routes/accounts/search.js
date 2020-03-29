import { Account } from '@models';

export default async function searchAccounts(request, response) {
	const accounts = await Account.findAll();
	response.send(accounts);
}

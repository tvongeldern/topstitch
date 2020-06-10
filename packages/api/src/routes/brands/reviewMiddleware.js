import { Account } from '@models';

export async function reviewMiddleware(
	{
		body: {
			name,
			...body
		},
		me: { id },
	},
	response,
	next,
) {
	if (name) {
		const account = await Account.findByPk(id);
		if (!account.name) {
			account.name = name;
			await account.save();
		}
	}
	return next();
}
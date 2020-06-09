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
	if (!name) {
		return next();
	}
	const me = await Account.findByPk(id);
	console.log(me);
	console.log('name', me.name);
	if (!me.name) {
		me.name = name;
		await me.save();
	}
	return next();
}
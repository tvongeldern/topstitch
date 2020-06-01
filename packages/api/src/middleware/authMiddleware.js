import { Account } from '@models';

const MyAccount = Account.scope('myself');

export async function authMiddleware(request, response, next) {
	const { token } = request;
	if (!token) {
		return next();
	}
	const me = await MyAccount.findOne({
		where: { cognitoId: token.sub },
	});
	if (me) {
		request.me = me.toJSON();
	}
	next();
}

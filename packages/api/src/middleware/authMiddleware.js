import { Account } from '@models';

const MyAccount = Account.scope('myself');

export async function authMiddleware(request, response, next) {
	const { token } = request;
	if (!token) {
		return next();
	}
	const account = await MyAccount.findOne({
		where: { cognitoId: token.sub },
	});
	request.account = account;
	next();
}

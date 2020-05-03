import { SavedSize } from '@models';

export async function addSavedSize(
	{
		account,
		body,
	},
	response,
	errorHandler,
) {
	try {
		const savedSize = new SavedSize({
			...body,
			accountId: account.id,
		});
		const saved = await savedSize.save();
		const json = saved.toJSON();
		return response.send(json);
	} catch (error) {
		return errorHandler({ error });
	}
}

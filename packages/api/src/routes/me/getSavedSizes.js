import { SavedSize } from '@models';

export async function getSavedSizes(
	{ account },
	response,
	errorHandler,
) {
	try {
		const savedSizes = await SavedSize.findAll({
			accountId: account.id,
		});
		const json = savedSizes.toJSON();
		return response.send(json);
	} catch (error) {
		return errorHandler({ error });
	}
}

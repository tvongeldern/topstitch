import { SavedSize } from '@models';

export async function getSavedSizes(
	{ me },
	response,
	errorHandler,
) {
	try {
		const savedSizes = await SavedSize.findAll({
			accountId: me.id,
		});
		const json = savedSizes.toJSON();
		return response.send(json);
	} catch (error) {
		return errorHandler({ error });
	}
}

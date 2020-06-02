import { CollectionGarment } from '@models';

export async function removeGarment(
	{
		params: {
			collectionId,
			garmentId,
		},
	},
	response,
	errorHandler,
) {
	const mapping = await CollectionGarment.findOne({
		where: {
			collectionId,
			garmentId,
		},
	});
	if (!mapping) {
		return errorHandler({ status: 404 });
	}
	await mapping.destroy();
	return response.status(204).send();
}

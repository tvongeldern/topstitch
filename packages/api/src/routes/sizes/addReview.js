import { Size } from '@models';

export async function addReview(
	{
		body,
		me: { id: createdBy },
		params: { id },
	},
	response,
	errorHandler,
) {
	const parent = await Size.findByPk(id);
	if (!parent) {
		return errorHandler({
			status: 404,
			message: 'Size not found',
		});
	}
	try {
		const review = await parent.addReview({
			...body,
			createdBy,
		});
		const json = await review.toJSON();
		return response.send(json);
	} catch (error) {
		console.log(error);
		return errorHandler({ error });
	}
}

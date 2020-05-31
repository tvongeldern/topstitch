import { Size } from '@models';

export async function addReview(
	{
		body,
		me,
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
	const review = await parent.addReview({
		...body,
		createdBy: me.id,
	});
	const json = await review.toJSON();
	return response.send(json);
}

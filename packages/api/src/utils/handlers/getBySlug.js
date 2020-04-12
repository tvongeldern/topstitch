export function getBySlug(Model, { attributes, include } = {}) {
	return async function get(
		{
			params: { slug },
		},
		response,
		next,
	) {
		try {
			const object = await Model.findOne({
				attributes,
				include,
				where: { slug },
			});
			if (!object) {
				return next({
					status: 404,
					message: `${Model.name} ${slug} not found`,
				});
			}
			const json = object.toJSON();
			response.send(json);
		} catch (error) {
			return next({
				error,
				message: `Invalid ${Model.name} ID`,
				status: 400,
			});
		}
	}
}

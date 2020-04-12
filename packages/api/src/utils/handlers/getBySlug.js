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
					message: `No ${Model.name} found with ID ${id}`,
				});
			}
			const json = object.toJSON();
			response.send(json);
		} catch (error) {
			return next({
				status: 400,
				message: `Invalid ${Model.name} ID`,
			});
		}
	}
}

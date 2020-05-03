export function getOne(Model, { attributes, include } = {}) {
	return async function get(
		{
			params,
		},
		response,
		next,
	) {
		try {
			const object = await Model.findOne({
				attributes,
				include,
				where: params,
			});
			if (!object) {
				return next({
					status: 404,
					message: `${Model.name} not found`,
				});
			}
			const json = object.toJSON();
			response.send(json);
		} catch (error) {
			return next({ error });
		}
	}
}

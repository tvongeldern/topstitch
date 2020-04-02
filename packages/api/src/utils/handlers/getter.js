export function getter(Model) {
	return async function get(
		{
			params: { id },
		},
		response,
		next,
	) {
		try {
			const object = await Model.findByPk(id);
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

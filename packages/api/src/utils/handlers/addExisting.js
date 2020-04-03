export function addExisting(ParentModel, childModelName) {
	return async function add(
		{
			params: { childId, id },
		},
		response,
		errorHandler,
	) {
		const method = `add${childModelName}`
		try {
			const parent = await ParentModel.findByPk(id);
			if (!parent) {
				return errorHandler({
					status: 404,
					message: `No ${ParentModel.name} found with ID ${id}`,
				});
			}
			const updated = await parent[method](childId);
			const json = updated.toJSON();
			response.send(json);
		} catch (error) {
			console.log(error);
			return errorHandler({
				error,
				status: 400,
				message: 'Invalid ID provided',
			});
		}
	}
}
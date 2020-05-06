export function addExisting(ParentModel, methodName) {
	return async function add(
		{
			logger,
			params: { id },
			body: { id: childId },
		},
		response,
		errorHandler,
	) {
		try {
			const parent = await ParentModel.findByPk(id);
			if (!parent) {
				return errorHandler({
					status: 404,
					message: `No ${ParentModel.name} found with ID ${id}`,
				});
			}
			const updated = await parent[methodName](childId);
			// const json = updated.toJSON();
			response.send(updated);
		} catch (error) {
			logger.error(error);
			return errorHandler({ error });
		}
	}
}

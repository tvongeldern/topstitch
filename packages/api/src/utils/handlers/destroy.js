export function destroy(Model) {
	return async function destroyHandler(
		{ params: { id } },
		response,
		errorHandler,
	) {
		try {
			const record = await Model.findByPk(id);
			if (!record) {
				return errorHandler({
					status: 404,
				});
			}
			await record.destroy();
			return response.status(204).send();
		} catch (error) {
			return errorHandler({ error });
		}
	}
}

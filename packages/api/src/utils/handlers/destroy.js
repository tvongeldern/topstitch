export function destroy(Model) {
	return async function destroyHandler(
		{
			me,
			params: { id },
		},
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
			if (record.accountId !== me.id) {
				return errorHandler({
					status: 403,
					message: 'Forbidden',
				});
			}
			await record.destroy();
			return response.status(204).send();
		} catch (error) {
			return errorHandler({ error });
		}
	}
}

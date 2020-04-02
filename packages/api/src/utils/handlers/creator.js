export function creator(ParentModel, childModelName) {
	if (!childModelName) {
		return async function create({ body }, response, next) {
			try {
				const object = new ParentModel(body);
				const saved = await object.save();
				const json = saved.toJSON();
				response.send(json);
			} catch (error) {
				return next({
					error,
					status: 400,
					message: `Error creating ${ParentModel.name}`,
				});
			}
		}
	}

	return async function createNested({
		body,
		params: { id }
	},
		response,
		next,
	) {
		const method = `create${childModelName}`;
		try {
			const parent = await ParentModel.findByPk(id);
			if (!parent) {
				next({ status: 404, message: `No ${ParentModel.name} found with ID "${id}"` });
			}
			try {
				const line = await parent[method](body);
				const json = line.toJSON();
				return response.send(json);
			} catch (error) {
				return next({
					error,
					status: 400,
					message: `Error creating ${childModelName}`,
				})
			}
		} catch (error) {
			return next({ status: 400, message: `Invalid ${ParentModel.name} ID` });
		}
	}
}

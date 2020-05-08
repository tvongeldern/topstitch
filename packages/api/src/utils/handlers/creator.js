export function creator(ParentModel, methodName) {
	if (!methodName) {
		return async function create({ body }, response, next) {
			try {
				const object = new ParentModel(body);
				const saved = await object.save();
				const json = saved.toJSON();
				response.send(json);
			} catch (error) {
				return next({ error });
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
		try {
			const parent = await ParentModel.findByPk(id);
			if (!parent) {
				next({ status: 404, message: `No ${ParentModel.name} found with ID "${id}"` });
			}
			try {
				const child = await parent[methodName](body);
				const json = child.toJSON();
				return response.send(json);
			} catch (error) {
				return next({ error })
			}
		} catch (error) {
			return next({ error });
		}
	}
}

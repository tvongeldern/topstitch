const NO_ATTRIBUTES = [];

export function getChildren(ParentModel, ChildModel, childOptions = {}) {
	return async function getChildrenOdParent(
		{
			params,
		},
		response,
		next,
	) {
		try {
			const parent = await ParentModel.findOne({
				attributes: NO_ATTRIBUTES,
				include: [{
					model: ChildModel,
					...childOptions,
				}],
				where: params,
			});
			if (!parent) {
				return next({
					status: 404,
					message: `${ParentModel.name} not found`,
				});
			}
			try {
				const json = parent.toJSON();
				const [children] = Object.values(json);
				return response.send(children);
			} catch (error) {
				return next({ error });
			}
		} catch (error) {
			return next({
				error,
				status: 400,
				message: `Invalid ${ParentModel.name} ID`,
			});
		}
	}
}

import { Sequelize } from 'sequelize';
import { getJSON } from '../getJSON';

const NO_ATTRIBUTES = [];
const { iLike } = Sequelize.Op;

export function getChildren(ParentModel, ChildModel, options = {}) {
	return async function searchTable(
		{
			logger,
			params: { slug },
			query: { search, ...query },
		},
		response,
		next,
	) {
		try {
			const parent = await ParentModel.findOne({
				attributes: NO_ATTRIBUTES,
				include: [{
					model: ChildModel,
					...options,
				}],
				where: { slug },
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

import { Sequelize } from 'sequelize';
import { getJSON } from '../getJSON';

const { iLike } = Sequelize.Op;

export function searcher(ParentModel, childModelNamePlural) {
	return async function searchTable(
		{
			logger,
			params: { id },
			query: { search, ...query },
		},
		response,
		next,
	) {
		const method = `get${childModelNamePlural}`;
		try {
			const parent = await ParentModel.findByPk(id);
			if (!parent) {
				return next({
					status: 404,
					message: `No ${ParentModel.name} found with ID ${id}`,
				});
			}
			try {
				const children = await parent[method]({
					where: {
						...query,
						name: {
							[iLike]: `%${search}%`,
						},
					},
				});
				const json = children.map(getJSON);
				return response.send(json);
			} catch (error) {
				logger.error(error);
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

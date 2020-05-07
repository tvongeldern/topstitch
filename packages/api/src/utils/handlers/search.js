import { Op } from 'sequelize';
import { EMPTY_OBJECT } from '@constants';

const DEFAULT_ATTRIBUTES = ['id', 'name'];

export function search(Model, attributes = DEFAULT_ATTRIBUTES) {
	return async function searchEndpoint({ query }, response, next) {
		try {
			const { q } = query;
			const matches = await Model.findAll({
				attributes,
				where: {
					name: {
						[Op.iLike]: `%${q}%`,
					},
				},
			});
			return response.send(matches);
		} catch (error) {
			return next({ error });
		}
	}
}

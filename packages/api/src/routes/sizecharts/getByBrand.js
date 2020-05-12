import { Brand } from '@models';
import { UUID } from '@constants/patterns';
import { getSizechart  } from '@utils';

const type = 'brand';
const attributes = ['id'];

export async function getByBrand({
	params: { slugOrId },
}, response, next) {
	try {
		const isId = UUID.test(slugOrId);
		if (isId) {
			const sizechart = await getSizechart({ type, id: slugOrId });
			return response.send(sizechart);
		}
		const brand = await Brand.findOne({
			attributes,
			where: { slug: slugOrId },
		});
		if (!brand) {
			return next({
				status: 404,
				message: 'Sizechart not found',
			});
		}
		const sizechart = await getSizechart({
			type,
			id: brand.id,
		});
		return response.send(sizechart);
	} catch (error) {
		return next({ error });
	}
}

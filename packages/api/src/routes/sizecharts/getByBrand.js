import { Brand } from '@models';
import { UUID } from '@constants/patterns';
import { getSizechart } from '@utils';

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
		const { id } = await Brand.findOne({
			attributes,
			where: { slug: slugOrId },
		});
		const sizechart = await getSizechart({ type, id });
		return response.send(sizechart);
	} catch (error) {
		return next(error);
	}
}

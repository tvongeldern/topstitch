import { Brand } from '@models';

export default async function createLine({
		body,
		params: { brandId }
	},
	response,
	next,
) {
	try {
		const brand = await Brand.findByPk(brandId);
		if (!brand) {
			next({ status: 404, message: `No brand found with ID "${brandId}"` });
		}
		response.send(brand);
	} catch (error) {
		next({ status: 400, message: 'Invalid brand ID' });
	}
}

import { Brand } from '@models';

export default async function createLine({
		body,
		params: { brandId }
	},
	response,
	next,
) {
	next({ status: 404, message: 'ugh' });
	// try {
	// 	const brand = await Brand.findByPk(brandId);
	// 	if (!brand) {
	// 		next({ status: 404, message: `No brand found with ID "${brandId}"` });
	// 	}
	// 	console.log('HERE!!!');
	// 	response.send(brand);
	// } catch (error) {
	// 	console.log('CATCH BLOCK');
	// 	next({ status: 400, message: 'Invalid brand ID' });
	// }
}

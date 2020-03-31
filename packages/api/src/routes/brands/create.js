import { Brand } from '@models';

export default async function createBrand({ body }, response) {
	try {
		const brand = new Brand(body);
		const savedBrand = await brand.save();
		const json = await savedBrand.toJSON();
		response.send(json);
	} catch (error) {
		return response.status(400).send({
			error,
			message: 'Error creating brand',
		});
	}
}

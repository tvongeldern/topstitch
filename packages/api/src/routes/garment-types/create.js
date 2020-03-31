import { GarmentType } from '@models';

export default async function createGarmentType({ body }, response) {
	try {
		const garmentType = new GarmentType(body);
		const savedGarmentType = await garmentType.save();
		const json = await savedGarmentType.toJSON();
		response.send(json);
	} catch (error) {
		return response.status(400).send({
			error,
			message: 'Error creating garment type',
		});
	}
}

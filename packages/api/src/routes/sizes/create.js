import { Size } from '@models';

export default async function createSize({ body }, response) {
	try {
		const size = new Size(body);
		const savedSize = await size.save();
		const json = await savedSize.toJSON();
		response.send(json);
	} catch (error) {
		return response.status(400).send({
			error,
			message: 'Error creating size',
		});
	}
}

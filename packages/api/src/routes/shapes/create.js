import { Shape } from '@models';

export default async function createShape({ body }, response) {
	try {
		const shape = new Shape(body);
		const savedShape = await shape.save();
		const json = await savedShape.toJSON();
		response.send(json);
	} catch (error) {
		return response.status(400).send({
			error,
			message: 'Error creating shape',
		});
	}
}

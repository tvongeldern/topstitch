import { Line } from '@models';

export default async function createLine({ body }, response) {
	try {
		const line = new Line(body);
		const savedLine = await line.save();
		const json = await savedLine.toJSON();
		response.send(json);
	} catch (error) {
		return response.status(400).send({
			error,
			message: 'Error creating line',
		});
	}
}

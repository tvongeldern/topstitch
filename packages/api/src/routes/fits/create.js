import { Fit } from '@models';

export default async function createFit({ body }, response) {
	try {
		const fit = new Fit(body);
		const savedFit = await fit.save();
		const json = await savedFit.toJSON();
		response.send(json);
	} catch (error) {
		return response.status(400).send({
			error,
			message: 'Error creating fit',
		});
	}
}

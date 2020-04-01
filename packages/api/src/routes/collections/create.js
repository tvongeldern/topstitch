import { Collection } from '@models';

export default async function createCollection({ body }, response) {
	try {
		const collection = new Collection(body);
		const savedCollection = await collection.save();
		const json = await savedCollection.toJSON();
		response.send(json);
	} catch (error) {
		return response.status(400).send({
			error,
			message: 'Error creating collection',
		});
	}
}

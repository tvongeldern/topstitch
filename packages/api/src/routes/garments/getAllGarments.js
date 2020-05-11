import { Garment } from '@models';
import { errorActionReducer, getJSON  } from '@utils';

export async function getAllGarments(request, response, next) {
	try {
		const garments = await Garment.findAll();
		const json = garments.map(getJSON);
		return response.send(json);
	} catch (error) {
		return next({ error });
	}
}

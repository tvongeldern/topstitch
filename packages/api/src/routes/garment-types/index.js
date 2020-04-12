import { Router } from 'express';
import { GarmentType, GarmentSegment } from '@models';
import { creator, getBySlug, getChildren } from '@utils/handlers';

const options = {
	attributes: ['id', 'name', 'slug'],
};

const garmentTypes = new Router();

garmentTypes.post('/', creator(GarmentType));

garmentTypes.get('/:slug', getBySlug(GarmentType, options));

garmentTypes.get('/:slug/segments', getChildren(GarmentType, GarmentSegment));

export default garmentTypes;

import { Router } from 'express';
import { Garment, Segment } from '@models';
import { creator, getOne, getChildren } from '@utils/handlers';

const garmentOptions = {
	attributes: ['id', 'name', 'slug'],
};

const garmentSegmentsOptions = {
	attributes: ['id', 'name', 'propName', 'description', 'garmentId'],
};

const garments = new Router();

garments.post('/', creator(Garment));

garments.get('/:slug', getOne(Garment, garmentOptions));

garments.get('/:slug/segments', getChildren(Garment, Segment, garmentSegmentsOptions));

export default garments;

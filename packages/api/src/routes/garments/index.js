import { Router } from 'express';
import { Garment, Segment } from '@models';
import { creator, getBySlug, getChildren } from '@utils/handlers';

const options = {
	attributes: ['id', 'name', 'slug'],
};

const garments = new Router();

garments.post('/', creator(Garment));

garments.get('/:slug', getBySlug(Garment, options));

garments.get('/:slug/segments', getChildren(Garment, Segment));

export default garments;

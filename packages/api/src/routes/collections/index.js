import { Router } from 'express';
import { Collection } from '@models';
import { addExisting, creator, getBySlug, getChildren } from '@utils/handlers';

const collections = new Router();

collections.get('/:slug', getBySlug(Collection));

collections.get('/:slug/fits/', getChildren(Collection, 'Fits'));
collections.post('/:slug/fits/', creator(Collection, 'Fit'));

collections.post(
	'/:slug/garment-types/add/:childId',
	addExisting(Collection, 'Garment'),
);

export default collections;

import { Router } from 'express';
import { Collection } from '@models';
import { addExisting, creator, getter, searcher } from '@utils/handlers';

const collections = new Router();

collections.get('/:id', getter(Collection));

collections.get('/:id/fits/', searcher(Collection, 'Fits'));
collections.post('/:id/fits/', creator(Collection, 'Fit'));

collections.post(
	'/:id/garment-types/add/:childId',
	addExisting(Collection, 'GarmentType'),
);

export default collections;

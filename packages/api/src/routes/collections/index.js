import { Router } from 'express';
import { Collection } from '@models';
import { addExisting, creator, destroy } from '@utils/handlers';

const collections = new Router();

collections.delete('/:id', destroy(Collection));

collections.post(
	'/:id/garments/',
	addExisting(Collection, 'addGarment'),
);

collections.post(
	'/:id/fits/',
	creator(Collection, 'createFit'),
);

export default collections;

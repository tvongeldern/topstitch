import { Router } from 'express';
import { Collection } from '@models';
import { addExisting, creator } from '@utils/handlers';

const collections = new Router();

collections.post(
	'/:id/garments/',
	addExisting(Collection, 'addGarment'),
);

collections.post(
	'/:id/fits/',
	creator(Collection, 'createFit'),
);

export default collections;

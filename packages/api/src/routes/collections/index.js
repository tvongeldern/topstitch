import { Router } from 'express';
import { Collection } from '@models';
import { REQUIRE_AUTH } from '@middleware';
import { addExisting, creator, destroy } from '@utils/handlers';
import { removeGarment } from './removeGarment';

const collections = new Router();

collections.delete(
	'/:id',
	REQUIRE_AUTH,
	destroy(Collection),
);

collections.post(
	'/:id/garments/',
	REQUIRE_AUTH,
	addExisting(Collection, 'addGarment'),
);

collections.post(
	'/:collectionId/garments/:garmentId',
	REQUIRE_AUTH,
	removeGarment,
);

collections.post(
	'/:id/fits/',
	REQUIRE_AUTH,
	creator(Collection, 'createFit'),
);

export default collections;

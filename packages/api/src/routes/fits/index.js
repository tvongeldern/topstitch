import { Router } from 'express';
import { Fit } from '@models';
import { REQUIRE_AUTH } from '@middleware';
import { creator, destroy } from '@utils/handlers';

const fits = new Router();

fits.delete('/:id', REQUIRE_AUTH, destroy(Fit));

fits.post(
	'/:id/sizes/',
	REQUIRE_AUTH,
	creator(Fit, 'createSize'),
);

export default fits;

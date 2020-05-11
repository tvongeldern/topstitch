import { Router } from 'express';
import { Fit } from '@models';
import { creator, destroy } from '@utils/handlers';

const fits = new Router();

fits.delete('/:id', destroy(Fit));

fits.post(
	'/:id/sizes/',
	creator(Fit, 'createSize'),
);

export default fits;

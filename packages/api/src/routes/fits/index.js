import { Router } from 'express';
import { Fit } from '@models';
import { creator } from '@utils/handlers';

const fits = new Router();

fits.post(
	'/:id/sizes/',
	creator(Fit, 'createSize'),
);

export default fits;

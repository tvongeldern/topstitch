import { Router } from 'express';
import { Size } from '@models';
import { creator } from '@utils/handlers';

const sizes = new Router();

sizes.post(
	'/:id/measurements/',
	creator(Size, 'createMeasurement'),
);

export default sizes;

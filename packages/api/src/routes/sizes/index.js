import { Router } from 'express';
import { Size } from '@models';
import { creator, destroy } from '@utils/handlers';

const sizes = new Router();

sizes.delete('/:id', destroy(Size));

sizes.post(
	'/:id/measurements/',
	creator(Size, 'createMeasurement'),
);

export default sizes;

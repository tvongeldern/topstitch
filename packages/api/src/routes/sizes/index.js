import { Router } from 'express';
import { Size } from '@models';
import { creator, destroy } from '@utils/handlers';
import { addReview } from './addReview';

const sizes = new Router();

sizes.delete('/:id', destroy(Size));

sizes.post(
	'/:id/measurements/',
	creator(Size, 'createMeasurement'),
);

sizes.post('/:id/reviews/', addReview);

export default sizes;

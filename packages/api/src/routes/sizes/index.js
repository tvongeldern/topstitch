import { Router } from 'express';
import { Size } from '@models';
import { REQUIRE_AUTH } from '@middleware';
import { creator, destroy } from '@utils/handlers';
import { addReview } from './addReview';

const sizes = new Router();

sizes.delete('/:id', REQUIRE_AUTH, destroy(Size));

sizes.post(
	'/:id/measurements/',
	REQUIRE_AUTH,
	creator(Size, 'createMeasurement'),
);

sizes.post('/:id/reviews/', REQUIRE_AUTH, addReview);

export default sizes;

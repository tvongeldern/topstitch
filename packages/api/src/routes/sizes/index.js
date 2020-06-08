import { Router } from 'express';
import { Size } from '@models';
import { REQUIRE_AUTH } from '@middleware';
import { creator, destroy } from '@utils/handlers';

const sizes = new Router();

sizes.delete('/:id', REQUIRE_AUTH, destroy(Size));

sizes.post(
	'/:id/measurements/',
	REQUIRE_AUTH,
	creator(Size, 'createMeasurement'),
);

export default sizes;

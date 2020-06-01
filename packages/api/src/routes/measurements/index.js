import { Router } from 'express';
import { Measurement } from '@models';
import { REQUIRE_AUTH } from '@middleware';
import { destroy } from '@utils/handlers';

const measurements = new Router();

measurements.delete('/:id', REQUIRE_AUTH, destroy(Measurement));

export default measurements;

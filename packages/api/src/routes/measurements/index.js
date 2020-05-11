import { Router } from 'express';
import { Measurement } from '@models';
import { destroy } from '@utils/handlers';

const measurements = new Router();

measurements.delete('/:id', destroy(Measurement));

export default measurements;

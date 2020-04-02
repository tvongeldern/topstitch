import { Router } from 'express';
import { Measurement } from '@models';
import { getter } from '@utils/handlers';

const measurements = new Router();

measurements.get('/:id', getter(Measurement));

export default measurements;

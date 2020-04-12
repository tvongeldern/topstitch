import { Router } from 'express';
import { Measurement } from '@models';
import { getBySlug } from '@utils/handlers';

const measurements = new Router();

measurements.get('/:slug', getBySlug(Measurement));

export default measurements;

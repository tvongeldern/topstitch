import { Router } from 'express';
import { Size } from '@models';
import { creator, getBySlug, getChildren } from '@utils/handlers';

const sizes = new Router();

sizes.get('/:slug', getBySlug(Size));

sizes.get('/:slug/measurements/', getChildren(Size, 'Measurements'));
sizes.post('/:slug/measurements/', creator(Size, 'Measurement'));

export default sizes;

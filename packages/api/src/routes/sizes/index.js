import { Router } from 'express';
import { Size } from '@models';
import { creator, getter, searcher } from '@utils/handlers';

const sizes = new Router();

sizes.get('/:id', getter(Size));

sizes.get('/:id/measurements/', searcher(Size, 'Measurements'));
sizes.post('/:id/measurements/', creator(Size, 'Measurement'));

export default sizes;

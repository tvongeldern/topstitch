import { Router } from 'express';
import { Fit } from '@models';
import { creator, getter, searcher } from '@utils/handlers';

const fits = new Router();

fits.get('/:id', getter(Fit));

fits.get('/:id/sizes/', searcher(Fit, 'Sizes'));
fits.post('/:id/sizes/', creator(Fit, 'Size'));

export default fits;

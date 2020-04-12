import { Router } from 'express';
import { Fit } from '@models';
import { creator, getBySlug, getChildren } from '@utils/handlers';

const fits = new Router();

fits.get('/:slug', getBySlug(Fit));

fits.get('/:slug/sizes/', getChildren(Fit, 'Sizes'));
fits.post('/:slug/sizes/', creator(Fit, 'Size'));

export default fits;

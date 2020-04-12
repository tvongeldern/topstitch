import { Router } from 'express';
import { Brand } from '@models';
import { creator, getBySlug, getChildren } from '@utils/handlers';

const brands = new Router();

brands.post('/', creator(Brand));

brands.get('/:slug', getBySlug(Brand));

brands.get('/:slug/lines/', getChildren(Brand, 'Lines'));
brands.post('/:slug/lines/', creator(Brand, 'Line'));

export default brands;

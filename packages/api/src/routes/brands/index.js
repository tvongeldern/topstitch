import { Router } from 'express';
import { Brand } from '@models';
import { creator, getBySlug, getChildren } from '@utils/handlers';

const brands = new Router();

brands.post('/', creator(Brand));

brands.get('/:slug', getBySlug(Brand));

export default brands;

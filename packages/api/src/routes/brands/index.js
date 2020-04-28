import { Router } from 'express';
import { Brand } from '@models';
import { creator, getBySlug, search } from '@utils/handlers';

const SEARCH_ATTRIBUTES = ['id', 'name', 'slug'];

const brands = new Router();

brands.post('/', creator(Brand));

brands.get('/:slug', getBySlug(Brand));

brands.get('/', search(Brand, SEARCH_ATTRIBUTES))

export default brands;

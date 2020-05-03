import { Router } from 'express';
import { Brand } from '@models';
import { creator, getOne, search } from '@utils/handlers';

const SEARCH_ATTRIBUTES = ['id', 'name', 'slug'];

const brands = new Router();

brands.post('/', creator(Brand));

brands.get('/:slug', getOne(Brand));

brands.get('/', search(Brand, SEARCH_ATTRIBUTES))

export default brands;

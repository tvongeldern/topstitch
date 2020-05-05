import { Router } from 'express';
import { Brand } from '@models';
import { creator, getOne, search } from '@utils/handlers';

const SEARCH_ATTRIBUTES = ['id', 'name', 'slug'];

const brands = new Router();

brands.post('/', creator(Brand));
brands.get('/', search(Brand, SEARCH_ATTRIBUTES))

brands.get('/:slug', getOne(Brand));

brands.post('/:id/collections/', creator(Brand, 'createCollection'));


export default brands;

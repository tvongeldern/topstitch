import { Router } from 'express';
import { Brand } from '@models';
import { creator, getter, searcher } from '@utils/handlers';

const brands = new Router();

brands.post('/', creator(Brand));

brands.get('/:id', getter(Brand));

brands.get('/:id/lines/', searcher(Brand, 'Lines'));
brands.post('/:id/lines/', creator(Brand, 'Line'));

export default brands;

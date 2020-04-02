import { Router } from 'express';
import { Collection } from '@models';
import { creator, getter, searcher } from '@utils/handlers';

const collections = new Router();

collections.get('/:id', getter(Collection));

collections.get('/:id/fits/', searcher(Collection, 'Fits'));
collections.post('/:id/fits/', creator(Collection, 'Fit'));

export default collections;

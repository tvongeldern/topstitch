import { Router } from 'express';
import getLine from './getLine';
import searchCollections from './getLine';
import createCollection from './createCollection';

const accounts = new Router();

accounts.get('/:id', getLine);

accounts.get('/:id/collections/', searchCollections);
accounts.post('/:id/collections/', createCollection);

export default accounts;

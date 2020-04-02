import { Router } from 'express';
import createBrand from './createBrand';
import getBrand from './getBrand';
import createLine from './createLine';
import searchLines from './searchLines';

const accounts = new Router();

accounts.post('/', createBrand);

accounts.get('/:id', getBrand);

accounts.post('/:id/lines/', createLine);
accounts.get('/:id/lines/', searchLines);

export default accounts;

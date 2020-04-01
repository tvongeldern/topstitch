import { Router } from 'express';
import create from './create';
import createLine from './createLine';

const accounts = new Router();

accounts.post('/', create);
accounts.post('/:brandId/', createLine);


export default accounts;

import { Router } from 'express';
import create from './create';
import search from './search';

const accounts = new Router();

accounts.get('/', search);
accounts.post('/', create);

export default accounts;

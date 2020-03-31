import { Router } from 'express';
import create from './create';

const accounts = new Router();

accounts.post('/', create);

export default accounts;

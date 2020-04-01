import { Router } from 'express';
import create from './create';

const collections = new Router();

collections.post('/', create);

export default collections;

import { Router } from 'express';
import create from './create';

const sizes = new Router();

sizes.post('/', create);

export default sizes;

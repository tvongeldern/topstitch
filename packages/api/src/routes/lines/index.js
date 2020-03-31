import { Router } from 'express';
import create from './create';

const lines = new Router();

lines.post('/', create);

export default lines;

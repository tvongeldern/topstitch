import { Router } from 'express';
import create from './create';

const shapes = new Router();

shapes.post('/', create);

export default shapes;

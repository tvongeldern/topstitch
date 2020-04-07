import { Router } from 'express';
import { sizechartGetter } from './sizechartGetter';

const sizecharts = new Router();

sizecharts.get('/:type/:id', sizechartGetter);

export default sizecharts;
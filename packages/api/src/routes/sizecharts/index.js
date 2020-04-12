import { Router } from 'express';
import { sizechartGetter } from './sizechartGetter';

const sizecharts = new Router();

sizecharts.get('/:type/:slug', sizechartGetter);

export default sizecharts;
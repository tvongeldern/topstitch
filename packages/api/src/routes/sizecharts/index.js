import { Router } from 'express';
import { getByBrand } from './getByBrand';

const sizecharts = new Router();

sizecharts.get('/:slugOrId', getByBrand);

export default sizecharts;

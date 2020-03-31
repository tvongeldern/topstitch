import { Router } from 'express';
import create from './create';

const fits = new Router();

fits.post('/', create);

export default fits;

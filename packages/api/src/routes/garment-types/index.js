import { Router } from 'express';
import create from './create';

const garmentTypes = new Router();

garmentTypes.post('/', create);

export default garmentTypes;

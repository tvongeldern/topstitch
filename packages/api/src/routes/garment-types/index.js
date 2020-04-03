import { Router } from 'express';
import { GarmentType } from '@models';
import { creator, getter, searcher } from '@utils/handlers';

const garmentTypes = new Router();

garmentTypes.post('/', creator(GarmentType));

export default garmentTypes;

import { Router } from 'express';
import { Line } from '@models';
import { creator, getter, searcher } from '@utils/handlers';

const lines = new Router();

lines.get('/:id', getter(Line));

lines.get('/:id/collections/', searcher(Line, 'Collections'));
lines.post('/:id/collections/', creator(Line, 'Collection'));

export default lines;

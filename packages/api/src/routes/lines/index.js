import { Router } from 'express';
import { Line } from '@models';
import { creator, getBySlug, getChildren } from '@utils/handlers';

const lines = new Router();

lines.get('/:slug', getBySlug(Line));

lines.get('/:slug/collections/', getChildren(Line, 'Collections'));
lines.post('/:slug/collections/', creator(Line, 'Collection'));

export default lines;

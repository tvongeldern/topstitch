import { Router } from 'express';
import { requireAuth } from '@middleware';
import { addSavedSize } from './addSavedSize';
import { createAccount } from './createAccount';
import { getMyAccount } from './getMyAccount';
import { getSavedSizes } from './getSavedSizes';

const me = new Router();

me.get('/', requireAuth, getMyAccount);
me.post('/', createAccount);

me.get('/saved-sizes/', requireAuth, getSavedSizes);
me.post('/saved-sizes/', requireAuth, addSavedSize);


export default me;

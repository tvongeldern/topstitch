import { Router } from 'express';
import { REQUIRE_AUTH } from '@middleware';
import { addSavedSize } from './addSavedSize';
import { createAccount } from './createAccount';
import { getMyAccount } from './getMyAccount';
import { getSavedSizes } from './getSavedSizes';

const me = new Router();

me.get('/', REQUIRE_AUTH, getMyAccount);
me.post('/', createAccount);

me.get('/saved-sizes/', REQUIRE_AUTH, getSavedSizes);
me.post('/saved-sizes/', REQUIRE_AUTH, addSavedSize);


export default me;

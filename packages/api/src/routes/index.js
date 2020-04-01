import { Router } from 'express';
import accounts from './accounts';
import brands from './brands';
import fits from './fits';
import garmentTypes from './garment-types';
import lines from './lines';
import collections from './collections';
import sizes from './sizes';

const router = new Router();

router.use('/accounts', accounts);
router.use('/brands', brands);
router.use('/lines', lines);
router.use('/collections', collections);
router.use('/garment-types', garmentTypes);
router.use('/fits', fits);
router.use('/sizes', sizes);


export default router;

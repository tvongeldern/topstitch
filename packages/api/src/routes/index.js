import { Router } from 'express';
import { genericEndpointError } from '@middleware';
import accounts from './accounts';
import brands from './brands';
import fits from './fits';
import garments from './garment-types';
import lines from './lines';
import collections from './collections';
import sizes from './sizes';
import measurements from './measurements';
import sizecharts from './sizecharts';

const router = new Router();

router.use('/accounts', accounts);
router.use('/brands', brands);
router.use('/lines', lines);
router.use('/collections', collections);
router.use('/garments', garments);
router.use('/fits', fits);
router.use('/sizes', sizes);
router.use('/measurements', measurements);
router.use('/sizecharts', sizecharts);

router.use('*', genericEndpointError); // Must be very last route defined!

export default router;

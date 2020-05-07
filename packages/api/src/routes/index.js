import { Router } from 'express';
import { genericEndpointError } from '@middleware';
import brands from './brands';
import collections from './collections';
import fits from './fits';
import garments from './garments';
import me from './me';
import sizecharts from './sizecharts';
import sizes from './sizes';

const router = new Router();

router.use('/brands', brands);
router.use('/collections', collections);
router.use('/fits', fits);
router.use('/garments', garments);
router.use('/me', me);
router.use('/sizecharts', sizecharts);
router.use('/sizes', sizes);

router.use('*', genericEndpointError); // Must be very last route defined!

export default router;

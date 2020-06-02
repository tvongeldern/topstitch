import { Router } from 'express';
import { genericEndpointError } from '@middleware';
import brands from './brands';
import collections from './collections';
import fits from './fits';
import garments from './garments';
import measurements from './measurements';
import me from './me';
import publicRoutes from './public';
import sizecharts from './sizecharts';
import sizes from './sizes';

const router = new Router();

router.use('/brands', brands);
router.use('/collections', collections);
router.use('/fits', fits);
router.use('/garments', garments);
router.use('/me', me);
router.use('/public', publicRoutes);
router.use('/measurements', measurements);
router.use('/sizecharts', sizecharts);
router.use('/sizes', sizes);

router.use('*', genericEndpointError); // Must be very last route defined!

export default router;

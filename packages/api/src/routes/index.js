import { Router } from 'express';
import { genericEndpointError } from '@middleware';
import brands from './brands';
import garments from './garments';
import me from './me';
import sizecharts from './sizecharts';

const router = new Router();

router.use('/brands', brands);
router.use('/garments', garments);
router.use('/me', me);
router.use('/sizecharts', sizecharts);

router.use('*', genericEndpointError); // Must be very last route defined!

export default router;

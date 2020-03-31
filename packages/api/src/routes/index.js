import { Router } from 'express';
import accounts from './accounts';
import brands from './brands';
import fits from './fits';
import garmentTypes from './garment-types';
import lines from './lines';
import shapes from './shapes';
import sizes from './sizes';

const router = new Router();

router.use('/accounts', accounts);
router.use('/brands', brands);
router.use('/brands', lines);
router.use('/fits', fits);
router.use('/garment-types', garmentTypes);
router.use('/shapes', shapes);
router.use('/sizes', sizes);

export default router;

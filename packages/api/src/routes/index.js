import { Router } from 'express';
import accounts from './accounts';
import brands from './brands';
import lines from './lines';
import shapes from './shapes';
import fits from './fits';
import sizes from './sizes';

const router = new Router();

router.use('/accounts', accounts);
router.use('/brands', brands);
router.use('/brands', lines);
router.use('/shapes', shapes);
router.use('/fits', fits);
router.use('/sizes', sizes);

export default router;

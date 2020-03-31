import { Router } from 'express';
import accounts from './accounts';
import brands from './brands';
import lines from './lines';

const router = new Router();

router.use('/accounts', accounts);
router.use('/brands', brands);
router.use('/brands', lines);

export default router;

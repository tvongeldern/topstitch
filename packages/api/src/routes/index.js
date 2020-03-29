import { Router } from 'express';
import accounts from './accounts';

const router = new Router();

router.use('/accounts', accounts);

export default router;

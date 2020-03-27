import { Router } from 'express';

const router = new Router();

function testHandler(req, res) {
	res.send(`Hello World! testvar is "${TEST_VAR}"`);
}

router.get('/', testHandler);

export default router;

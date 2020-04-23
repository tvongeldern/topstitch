import { Router } from 'express';
import { createAccount } from './createAccount';

const accounts = new Router();

accounts.post('/me', createAccount);

export default accounts;

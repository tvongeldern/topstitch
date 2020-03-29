import { Router } from 'express';
import create from './create';

const users = new Router();

users.post('/', create);

export default users;

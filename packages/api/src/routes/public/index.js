import { Router } from 'express';
import { getFeed } from './getFeed';

const publicRoutes = new Router();

publicRoutes.get('/feed', getFeed);

export default publicRoutes;

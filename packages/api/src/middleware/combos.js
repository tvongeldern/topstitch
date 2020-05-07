import { authMiddleware } from './authMiddleware';
import { jwtMiddleware } from './jwtMiddleware';
import { requireAuth } from './requireAuth';

export const REQUIRE_AUTH = [jwtMiddleware, authMiddleware, requireAuth];
export const USE_AUTH = [jwtMiddleware, authMiddleware];

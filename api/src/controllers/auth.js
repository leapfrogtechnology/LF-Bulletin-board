import { Router } from 'express';

import * as CONSTANT from '../const';

import * as userService from '../services/userService';
import * as authService from '../services/authService';
import * as tokenService from '../services/tokenService';

import ensureToken from '../middlewares/ensureToken';
import validateRefreshToken from '../middlewares/validateToken';
import validateGoogleToken from '../middlewares/verifyGoogleToken';

import { checkUserExistsByEmail } from '../validators/userValidator';

const router = Router();

/**
 * GET /api/validateuser.
 */
router.get('/validateuser', ensureToken, checkUserExistsByEmail, (req, res, next) => {
  res.json({ user: req.userObj });
});

/**
 * POST /api/login.
 */
router.post('/login', (req, res, next) => {
  authService
    .loginUser(req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
});

/**
 * POST /api/refresh.
 */
router.post('/refresh', validateRefreshToken, (req, res, next) => {
  tokenService
    .verifyRefreshToken(req.token)
    .then((data) => res.json({ accessToken: data }))
    .catch((err) => next(err));
});

/**
 * DELETE /api/logout.
 */
router.delete('/logout', (req, res, next) => {
  const requestToken = req.body.authorization.substring(CONSTANT.BEARER_LENGTH);

  authService
    .logoutUser(requestToken)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
});
/**
 * Authenticate google login /api/auth/google.
 */
router.post('/auth/google', validateGoogleToken, (req, res, next) => {
  userService
    .loginUser(req.user)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
});
export default router;

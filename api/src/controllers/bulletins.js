import { Router } from 'express';
import HttpStatus from 'http-status-codes';

import * as socketIO from '../utils/socket';

import ensureToken from '../middlewares/ensureToken';

import * as bulletinService from '../services/bulletinService';

import { bulletinValidator } from '../validators/bulletinValidator';
import { bulletinsValidator } from '../validators/bulletinsValidator';

const router = Router();

/**
 * GET /api/bulletins
 */
router.get('/', (req, res, next) => {
  bulletinService
    .getAllBulletins()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/bulletins/:id
 */
router.get('/:id', (req, res, next) => {
  bulletinService
    .getBulletin(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/bulletins
 */
router.post('/', ensureToken, bulletinValidator, (req, res, next) => {
  bulletinService
    .createBulletin(req.body)
    .then(data => {
      socketIO.emitUpdate();

      return res.status(HttpStatus.CREATED).json({ data });
    })
    .catch(err => next(err));
});

/**
 * PUT /api/bulk/
 */

router.put('/bulk', ensureToken, bulletinsValidator, (req, res, next) => {
  bulletinService
    .updateBulletins(req.body)
    .then(data => {
      socketIO.emitUpdate();

      return res.json({ data });
    })
    .catch(err => next(err));
});

/**
 * PUT /api/bulletins/:id
 */
router.put('/:id', ensureToken, bulletinValidator, (req, res, next) => {
  bulletinService
    .updateBulletin(req.params.id, req.body)
    .then(data => {
      socketIO.emitUpdate();

      return res.json({ data });
    })
    .catch(err => next(err));
});

/**
 * DELETE /api/bulletins/:id
 */
router.delete('/:id', ensureToken, (req, res, next) => {
  bulletinService
    .deleteBulletin(req.params.id)
    .then(data => {
      socketIO.emitUpdate();

      return res.status(HttpStatus.NO_CONTENT).json({ data });
    })
    .catch(err => next(err));
});

export default router;

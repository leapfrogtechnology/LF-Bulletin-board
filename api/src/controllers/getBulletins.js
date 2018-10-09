import { Router } from 'express';
import * as bulletinService from '../services/bulletinService';

const router = Router();

/**
 * GET /api/get-bulletins
 */
router.get('/', (req, res, next) => {
  bulletinService
    .getAllBulletins()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/get-bulletins/:id
 */
router.get('/:id', (req, res, next) => {
  bulletinService
    .getBulletin(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;

import { Router } from 'express';

import swaggerSpec from './utils/swagger';
import authController from './controllers/auth';
import usersController from './controllers/users';
import ensureToken from './middlewares/ensureToken';
import bulletinsController from './controllers/bulletins';
import getBulletinsController from './controllers/getBulletins';
/**
 * Contains all API routes for the application.
 */
let router = Router();

/**
 * GET /api/swagger.json
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

/**
 * @swagger
 * definitions:
 *   App:
 *     title: App
 *     type: object
 *     properties:
 *       app:
 *         type: string
 *       apiVersion:
 *         type: string
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get API version
 *     description: App version
 *     produces:
 *       - application/json
 *     tags:
 *       - Base
 *     responses:
 *       200:
 *         description: Application and API version
 *         schema:
 *           title: Users
 *           type: object
 *           $ref: '#/definitions/App'
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/', authController);
router.use('/users', usersController);
router.use('/get-bulletins', getBulletinsController);
router.use('/bulletins', ensureToken, bulletinsController);

export default router;

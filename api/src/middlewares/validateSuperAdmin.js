import { userRoles } from '../const';

/**
 * Verifies access token.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export default function validateSuperAdmin(req, res, next) {
  req.userRole === userRoles.superAdmin ? next() : next('User Not Authorized');
}

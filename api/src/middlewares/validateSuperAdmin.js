import { userRoles } from '../const';

/**
 * Validate Super Admin Access.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export default function validateSuperAdmin(req, res, next) {
  req.userRole === userRoles.superAdmin ? next() : next('User Not Authorized');
}

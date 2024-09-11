import { UnauthenticatedError,UnauthorizedError,BadRequestError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError('authentication invalid');
    }
    try {
        const { userId, role } = verifyJWT(token);
        const testUser = userId === '66e187ff32f178d9f9187b01';
        req.user = { userId, role, testUser };
        next();
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid');
    }
};

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    };
};

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
        throw new BadRequestError('Demo User. Read Only!');
    }
    next();
};
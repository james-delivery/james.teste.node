import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error('token is missing');
    }

    const [, token] = authHeader.split(' ');

    if (token === authConfig.token.secret) {
        return next();
    } else {
        throw new Error('Invalid Token');
    }
}

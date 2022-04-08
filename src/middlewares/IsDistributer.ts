import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware, UnauthorizedError } from "routing-controllers";
import { UserModel } from "../models/User";

@Middleware({ type: 'before', priority: 50 })
export class IsDistributer implements ExpressMiddlewareInterface {
    async use(request: Request, response: Response, next: NextFunction) {
        const user = request['__user__'] as UserModel

        if (!user) {
            throw new UnauthorizedError('Unauthenticated')
        }

        if (user.type !== 'distributer') {
            throw new UnauthorizedError('User must be a distributer')
        }

        return next()
    }
}
import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware, UnauthorizedError } from "routing-controllers";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

@Middleware({ type: 'before', priority: 100 })
export class RequestMiddleware implements ExpressMiddlewareInterface {
    async use(request: Request, response: Response, next: NextFunction) {
        const token = request.headers.authorization?.replace(/^Bearer /, '')
        try {
            if (token) {
                const payload = AuthService.validateAndParseToken(token)
                const user = await UserService.getById(payload.sub)

                if (user) {
                    request['__user__'] = user
                }
            }

        } catch (e) {
            console.log('Req Exception', e)
        } finally {
            return next()
        }
    }
}
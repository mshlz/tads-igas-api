import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface, UnauthorizedError } from "routing-controllers";
import AuthService from "../services/AuthService";

export class IsAuthenticated implements ExpressMiddlewareInterface {
    use(request: Request, response: Response, next: NextFunction) {
        const token = request.headers.authorization?.replace(/^Bearer /, '')

        if (!token) {
            throw new UnauthorizedError('Missing access token')
        }

        try {
            const payload = AuthService.validateAndParseToken(token)
            return next()
        } catch (e) {
            throw new UnauthorizedError(e.message)
        }
    }
}
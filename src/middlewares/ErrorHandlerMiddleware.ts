
import { Request, Response } from 'express'
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, request: Request, response: Response, next: (err?: any) => any): any {
        if (!error) return next()

        return response
            .status(error.httpCode || 500)
            .json({ code: error.httpCode, name: error.name, message: error.message, errors: error.errors })
    }
}
import dotenv from 'dotenv'
dotenv.config()

import 'reflect-metadata'
import express from 'express'
import path from 'path'
import { useExpressServer } from 'routing-controllers'
import { initDb } from './db/connection'
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware'
import { RequestMiddleware } from './middlewares/RequestMiddleware'


export const createApp = async () => {
    await initDb()

    const app = express()

    useExpressServer(app, {
        cors: true,
        classTransformer: true,
        validation: true,
        defaultErrorHandler: false,
        controllers: [
            path.resolve(__dirname, 'controllers/**/*.*s')
        ],
        middlewares: [
            RequestMiddleware,
            ErrorHandlerMiddleware
        ]
    })

    app.use('*', (_, res) => {
        res.json({ code: 404, name: 'RouteNotFoundError', message: 'Route not found' })
    })

    return app
}
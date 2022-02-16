import { useExpressServer } from 'routing-controllers'
import express from 'express'
import path from 'path'

export const createApp = async () => {
    const app = express()

    useExpressServer(app, {
        classTransformer: false,
        controllers: [
            path.resolve(__dirname, 'controllers/**/*.*s')
        ]
    })

    return app
}
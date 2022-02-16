import { createApp } from './app'

const PORT = process.env.PORT || 3006
const bootstrap = async () => {
    const app = await createApp()

    app.listen(PORT, () => {
        console.log(`🚀 Server started at http://localhost:${PORT}`)
    })
}

bootstrap()
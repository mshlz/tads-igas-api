import dotenv from 'dotenv'
dotenv.config()

import { initDb } from "../src/db/connection"


async function execute() {
    await initDb()

    // do stuff...
}

execute()
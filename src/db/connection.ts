import mongoose from 'mongoose'
import { MONGO_URI } from '../config/env'

export async function initDb() {
    await mongoose.connect(MONGO_URI)
}
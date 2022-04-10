import mongoose from "mongoose"

export type RawModel<T> = Partial<mongoose.Document<any, any, T> & T & { _id: mongoose.Types.ObjectId }>

export type PublicModel<T> = {
    [P in keyof T]?: T[P]
} & {
    id: string
    createdAt: string
    updatedAt: string
}


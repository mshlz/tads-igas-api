import mongoose from 'mongoose'
import { AddressModel, AddressSchema } from './Address'
import bcrypt from 'bcrypt'

export const UserTypeArray = ['consumer', 'distributer'] as const
export type UserType = typeof UserTypeArray[number]

export interface UserModel {
    _id: string //TODO
    name: string
    email: string
    password: string
    active: boolean
    phone: string
    cpf: string
    cnpj: string
    type: UserType
    address?: AddressModel
}


export const UserSchema = new mongoose.Schema<UserModel>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    active: { type: Boolean },
    phone: { type: String },
    cpf: { type: String },
    cnpj: { type: String },
    type: { type: String, enum: UserTypeArray },
    address: { type: AddressSchema, }
}, {
    timestamps: true
})

UserSchema.pre('save', function (next) {
    const user = this

    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function (err, encrypted) {
            if (err) return next(err)

            user.password = encrypted
            return next()
        })
    })
})

export const User = mongoose.model('User', UserSchema)

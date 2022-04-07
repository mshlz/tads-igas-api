import UserService, { DocumentType } from "./UserService"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from "../config/env"
import { UserModel, UserType } from "../models/User"
import { BadRequestError } from "routing-controllers"

class AuthService {
    async login(email: string, password: string, type: UserType) {
        const user = await UserService.getByEmailAndType(email, type)

        if (!user) {
            throw new BadRequestError('User not found')
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new BadRequestError('Password invalid')
        }

        const { accessToken } = await this.generateTokens(user)

        return {
            accessToken
        }
    }

    async register(name: string, email: string, password: string, type: UserType, document: string, documentType: DocumentType, phone?: string) {
        const checkUser = await UserService.getByEmailAndType(email, type)

        if (checkUser) {
            throw new BadRequestError('User already exists')
        }

        const user = await UserService.create(name, email, password, type, document, documentType, phone)

        const { accessToken } = await this.generateTokens(user)

        return {
            accessToken,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                cpf: user.cpf,
                cnpj: user.cnpj,
                type: user.type
            }
        }
    }


    public validateAndParseToken(token: string) {
        return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
    }

    // - PRIVATE --------------------------------------------------------------------------------------
    private async generateTokens(user: UserModel) {
        // TODO
        const accessToken = jwt.sign({}, JWT_SECRET, { subject: String(user._id) })

        return { accessToken }
    }
}

export default new AuthService()
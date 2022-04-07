import { Body, Get, JsonController, Post, Req, UseBefore } from 'routing-controllers'
import { LoginInput } from '../dto/auth/LoginInput'
import { RegisterInput } from '../dto/auth/RegisterInput'
import { success } from '../helpers/http/responses'
import { IsAuthenticated } from '../middlewares/IsAuthenticated'
import { UserModel } from '../models/User'
import AuthService from '../services/AuthService'

@JsonController('/auth')
export class AuthController {
    @Post('/login')
    async login(@Body() body: LoginInput) {
        const { email, password, area } = body
        const result = await AuthService.login(email.trim().toLowerCase(), password, area)

        return success(result)
    }

    @Post('/register')
    async register(@Body() body: RegisterInput) {
        const { name, email, password, phone, document, documentType, area } = body
        const result = await AuthService.register(
            name.trim(),
            email.trim().toLowerCase(),
            password,
            area,
            document,
            documentType,
            phone
        )

        return success(result)
    }

    @Get('/self')
    @UseBefore(IsAuthenticated)
    async self(@Req() req) {
        // TODO create decorator to extract
        const user = req['__user__'] as UserModel

        return success({
            _id: String(user._id),
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            cnpj: user.cnpj,
            phone: user.phone,
            type: user.type,
            address: user.address,
        })
    }
}
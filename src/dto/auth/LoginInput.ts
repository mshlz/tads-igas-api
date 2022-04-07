import { IsEmail, IsIn, IsNotEmpty, Length } from "class-validator"
import { UserType, UserTypeArray } from "../../models/User"

export class LoginInput {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(6, 140)
    password: string

    @IsNotEmpty()
    @IsIn(UserTypeArray)
    area: UserType
}
import { IsIn, IsNotEmpty, IsOptional, Length } from "class-validator"
import { DocumentType, DocumentTypeArray } from "../../services/UserService"
import { LoginInput } from "./LoginInput"

export class RegisterInput extends LoginInput {
    @IsNotEmpty()
    @Length(3, 255)
    name: string

    @IsOptional()
    phone?: string

    @IsNotEmpty()
    document: string

    @IsNotEmpty()
    @IsIn(DocumentTypeArray)
    documentType: DocumentType
}
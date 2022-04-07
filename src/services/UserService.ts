import { User, UserType } from "../models/User"

export const DocumentTypeArray = ['cpf', 'cnpj'] as const
export type DocumentType = typeof DocumentTypeArray[number]

class UserService {
    async getByEmailAndType(email: string, type: UserType) {
        const user = await User.findOne({
            email,
            type
        })

        return user
    }

    async getById(id: string) {
        const user = await User.findOne({
            _id: id
        }).lean(true)

        return user
    }

    async create(name: string, email: string, password: string, type: UserType, document: string, documentType: DocumentType, phone?: string) {
        const user = await User.create({
            name,
            email,
            password,
            cpf: documentType === 'cpf' ? document : undefined,
            cnpj: documentType === 'cnpj' ? document : undefined,
            phone,
            type
        })

        return user
    }

}

export default new UserService()
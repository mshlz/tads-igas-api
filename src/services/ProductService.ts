import { Product } from "../models/Product"
import { User, UserType } from "../models/User"

export const DocumentTypeArray = ['cpf', 'cnpj'] as const
export type DocumentType = typeof DocumentTypeArray[number]

class ProductService {
    async listAllFromDistributor(distributoId: string) {
        const products = await Product.find({
            owner: distributoId
        }).lean()

        return products
    }

    // async create(name: string, email: string, password: string, type: UserType, document: string, documentType: DocumentType, phone?: string) {
    //     const user = await User.create({
    //         name,
    //         email,
    //         password,
    //         cpf: documentType === 'cpf' ? document : undefined,
    //         cnpj: documentType === 'cnpj' ? document : undefined,
    //         phone,
    //         type
    //     })

    //     return user
    // }

}

export default new ProductService()
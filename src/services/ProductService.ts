import { getPublicProduct, Product, ProductModel } from "../models/Product"

class ProductService {
    async listAllFromDistributer(distributerId: string) {
        const products = await Product.find({
            owner: distributerId
        }).lean()

        return products.map(getPublicProduct)
    }

    async create(name: string, description: string, image: string, price: number, quantity: number, distributerId: string) {
        const product = await Product.create({
            name,
            description,
            image,
            price,
            quantity,
            owner: distributerId
        })

        return getPublicProduct(product)
    }

}

export default new ProductService()
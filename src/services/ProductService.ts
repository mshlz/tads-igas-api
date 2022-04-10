import { NotFoundError, UnauthorizedError } from "routing-controllers"
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

    async update(productId: string, distributerId: string, name: string, description: string, image: string, price: number, quantity: number) {
        const product = await Product.findById(productId)

        if (!product) {
            throw new NotFoundError('Product not found')
        }

        if (String(product.owner) !== String(distributerId)) {
            throw new UnauthorizedError('This product does not belong to you')
        }

        product.name = name
        product.description = description
        product.image = image
        product.price = price
        product.quantity = quantity

        await product.save()

        return getPublicProduct(product)
    }
    
    async getOne(productId: string, distributerId: string) {
        const product = await Product.findById(productId)

        if (!product) {
            throw new NotFoundError('Product not found')
        }

        if (String(product.owner) !== String(distributerId)) {
            throw new UnauthorizedError('This product does not belong to you')
        }

        return getPublicProduct(product)
    }

}

export default new ProductService()
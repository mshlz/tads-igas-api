import { Body, Delete, Get, JsonController, Param, Post, Put, UseBefore } from 'routing-controllers'
import { CreateProductInput } from '../dto/product/CreateProductInput'
import { UpdateProductInput } from '../dto/product/UpdateProductInput'
import { SessionUser } from '../helpers/decorators/SessionUser'
import { success } from '../helpers/http/responses'
import { IsDistributer } from '../middlewares/IsDistributer'
import { getPublicProduct } from '../models/Product'
import { UserModel } from '../models/User'
import ProductService from '../services/ProductService'

@JsonController('/distributer/products')
@UseBefore(IsDistributer)
export class DistributerProductController {
    @Get()
    async listProducts(@SessionUser() user: UserModel) {
        const products = await ProductService.listAllFromDistributer(user._id)

        return success(products)
    }

    @Post()
    async createProduct(@Body() body: CreateProductInput, @SessionUser() user: UserModel) {
        const { name, description, image, price, quantity } = body
        const product = await ProductService.create(name, description, image, price, quantity, user._id)

        return success(getPublicProduct(product))
    }

    @Get('/:id')
    async getProduct(@Param('id') productId: string, @SessionUser() user: UserModel) {
        const product = await ProductService.getOne(productId, user._id)

        return success(getPublicProduct(product))
    }

    @Put('/:id')
    async updateProduct(@Body() body: UpdateProductInput, @Param('id') productId: string, @SessionUser() user: UserModel) {
        const { name, description, image, price, quantity } = body
        const product = await ProductService.update(productId, user._id, name, description, image, price, quantity)

        return success(getPublicProduct(product))
    }
    
    @Delete('/:id')
    async deleteProduct(@Param('id') productId: string, @SessionUser() user: UserModel) {
        await ProductService.deleteOne(productId, user._id)
        return success(true)
    }

}
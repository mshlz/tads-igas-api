import { Body, Get, JsonController, Post, UseBefore } from 'routing-controllers'
import { CreateProductInput } from '../dto/product/CreateProductInput'
import { SessionUser } from '../helpers/decorators/SessionUser'
import { success } from '../helpers/http/responses'
import { IsDistributer } from '../middlewares/IsDistributer'
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

        return success(product)
    }

}
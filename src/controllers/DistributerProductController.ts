import { Get, JsonController, UseBefore } from 'routing-controllers'
import { SessionUser } from '../helpers/decorators/SessionUser'
import { success } from '../helpers/http/responses'
import { IsDistributer } from '../middlewares/IsDistributer'
import { UserModel } from '../models/User'
import ProductService from '../services/ProductService'

@JsonController('/distributer/products')
@UseBefore(IsDistributer)
export class DistributerProductController {
    @Get('')
    async listProducts(@SessionUser() user: UserModel) {
        const products = await ProductService.listAllFromDistributor(user._id)
        
        return success(products)
    }

}
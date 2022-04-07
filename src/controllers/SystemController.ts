import { Get, JsonController, UseBefore } from 'routing-controllers'
import { IsAuthenticated } from '../middlewares/IsAuthenticated'

@JsonController('/system')
@UseBefore(IsAuthenticated)
export class SystemController {
    @Get('/health')
    async health() {
        return {
            type: 'health',
            ok: true
        }
    }
}
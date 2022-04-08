import { Get, JsonController } from 'routing-controllers'

@JsonController('/system')
export class SystemController {
    @Get('/health')
    async health() {
        return {
            type: 'health',
            ok: true
        }
    }
}
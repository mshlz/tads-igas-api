import { JsonController, Post, UploadedFile, UseBefore } from 'routing-controllers'
import { success } from '../helpers/http/responses'
import { IsAuthenticated } from '../middlewares/IsAuthenticated'
import ImageService from '../services/ImageService'

interface UploadFile {
    originalname: string
    mimetype: string
    buffer: Buffer
    size: number
}

@JsonController('/image')
@UseBefore(IsAuthenticated)
export class ImageController {
    @Post('/upload')
    async upload(@UploadedFile('image') image: UploadFile) {
        const result = await ImageService.uploadFile(image.buffer, image.originalname)

        return success({
            id: result.id,
            url: result.url,
            meta: result.meta
        })
    }
}
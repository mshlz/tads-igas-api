import { JsonController, Post, UploadedFile } from 'routing-controllers'
import ImageService from '../services/ImageService'

interface UploadFile {
    originalname: string
    mimetype: string
    buffer: Buffer
    size: number
}

@JsonController('/image')
export class ImageController {
    @Post('/upload')
    async upload(@UploadedFile('image') image: UploadFile) {
        const result = await ImageService.uploadFile(image.buffer, image.originalname)

        return {
            id: result.id,
            url: result.url,
            meta: result.meta
        }
    }
}
import axios from 'axios'
import FormData from 'form-data'
import { IMGUR_CLIENT_ID } from '../config/env'

class ImageService {
    async uploadFile(buffer: Buffer, filename?: string) {
        const form = new FormData()
        form.append('image', buffer, { filename })

        const response = await axios.post(`https://api.imgur.com/3/image`, form, {
            headers: {
                Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
                ...form.getHeaders()
            }
        })

        const { data } = response.data

        return {
            id: data.id,
            url: data.link,
            meta: data
        }
    }
}

export default new ImageService()
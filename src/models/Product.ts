import mongoose from 'mongoose'
import { UserModel } from './User'

export interface ProductModel {
    name: string
    description: string
    price: number
    image: string
    quantity: number
    owner: string | UserModel
}

export const ProductSchema = new mongoose.Schema<ProductModel>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
    quantity: { type: Number },
    owner: { type: mongoose.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

export const Product = mongoose.model('Product', ProductSchema)

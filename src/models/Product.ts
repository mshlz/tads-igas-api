import mongoose from 'mongoose'
import { PublicModel, RawModel } from '../helpers/types/mongoose'
import { UserModel } from './User'

export interface ProductModel {
    name: string
    description: string
    price: number
    image: string
    quantity: number
    owner: string | UserModel | PublicModel<UserModel>
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

// ------------------------------------------------------------
export const getPublicProduct = (doc: RawModel<ProductModel>): PublicModel<ProductModel> => ({
    id: doc.id || String(doc._id),
    name: doc.name,
    description: doc.description,
    price: doc.price,
    image: doc.image,
    quantity: doc.quantity,
    createdAt: doc['createdAt'],
    updatedAt: doc['updatedAt'],
})

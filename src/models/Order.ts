import mongoose from 'mongoose'
import { AddressModel, AddressSchema } from './Address'
import { ProductModel } from './Product'
import { UserModel } from './User'

export interface OrderProduct {
    original: string | ProductModel
    name: string
    picture: string
    unitPrice: number
    quantity: number
}

export const OrderProductSchema = new mongoose.Schema<OrderProduct>({
    original: { type: mongoose.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    picture: { type: String },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

export interface OrderModel {
    finalPrice: number
    paymentMethod: string
    status: string
    address: AddressModel
    products: OrderProduct[]
    distributor: string | UserModel
    owner: string | UserModel
}

export const OrderSchema = new mongoose.Schema<OrderModel>({
    finalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String },
    address: { type: AddressSchema },
    products: { type: [OrderProductSchema] },
    distributor: { type: mongoose.Types.ObjectId, ref: 'User' },
    owner: { type: mongoose.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

export const Order = mongoose.model('Order', OrderSchema)

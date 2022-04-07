import mongoose from 'mongoose'

export interface AddressModel {
    street: string
    streetNumber: string
    district: string
    complement: string
    city: string
    state: string
    zipcode: string
    main?: boolean
}

export const AddressSchema = new mongoose.Schema<AddressModel>({
    street: { type: String },
    streetNumber: { type: String },
    district: { type: String },
    complement: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    main: { type: Boolean },
}, {
    timestamps: true
})

export const Address = mongoose.model('Address', AddressSchema)

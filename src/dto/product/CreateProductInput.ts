import { IsNotEmpty, IsNumber, Length } from "class-validator"

export class CreateProductInput {
    @IsNotEmpty()
    @Length(1, 140)
    name: string

    @Length(0, 500)
    description: string
    
    image: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    quantity: number
}
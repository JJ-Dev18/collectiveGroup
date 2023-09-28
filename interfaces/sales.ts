import { IProduct, IUser } from "."

export interface ISales {
    id: number
    shippingAddress: any
    paymentResult: any
    isPaid: boolean
    paidAt: any
    transactionId: any
    city: any
    country: any
    clienteId: number
    createdAt: string
    saleProducts: SaleProduct[]
    user: IUser
}


export interface SaleProduct {
    id: number
    productId: number
    saleId: number
    quantity: number
    price: number
    subtotal: string
    product: IProduct
  }
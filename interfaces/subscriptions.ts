import { IPackage } from "."

export interface ISubscription {
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
    subscriptionPackage: SubscriptionPackage[]
  }
  
  export interface SubscriptionPackage {
    id: number
    packageId: number
    subscriptionId: number
    quantity: number
    price: number
    subtotal: string
    package: IPackage
  }
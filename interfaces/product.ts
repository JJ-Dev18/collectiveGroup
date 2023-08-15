import { Benefits } from "./benefit";


export interface IProduct {
  id: number
  name: string
  price: number
  createdAt: Date
  updatedAt: string | null
  benefits?: Benefits[]
}



// model Product {
//     id   Int     @id @default(autoincrement())
//     name String
//     cost Decimal
//     Benefits BenefitOnProducts[]
//   }
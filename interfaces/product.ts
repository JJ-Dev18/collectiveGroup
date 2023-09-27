import { Benefits, Benefit } from './benefit';


export interface IProduct {
  id: number
  name: string
  price: number
  brochure? : string
  createdAt: Date
  updatedAt: string | null
  benefits?: Benefits[]  | Benefit[]
}



// model Product {
//     id   Int     @id @default(autoincrement())
//     name String
//     cost Decimal
//     Benefits BenefitOnProducts[]
//   }
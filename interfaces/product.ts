import { IBenefit } from "./benefit";


export interface IProduct {
    id : number;
    name : string;
    cost : number;
    // benefits : IBenefit[]
}

// model Product {
//     id   Int     @id @default(autoincrement())
//     name String
//     cost Decimal
//     Benefits BenefitOnProducts[]
//   }
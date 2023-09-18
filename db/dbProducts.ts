import { ItemInterface } from "fleed/interfaces";
import prisma from "./db"






export const getInventory = async() => {

    
    try {
      const inventoryProducts  = (await prisma.product.findMany()).map( product => {
        return {...product,id : product.id.toString()}
     })
      return inventoryProducts as unknown
    } catch (error) {
      console.log(error)
    }

}
import { ItemInterface } from "fleed/interfaces";
import prisma from "./db"


const bcrypt = require('bcrypt');




export const getInventory = async() => {

    
    try {
        const inventoryProducts  = (await prisma.product.findMany()).map( product => {
           return {...product,id : 'product000'+ product.id.toString()}
        })
        
        const inventoryPackages = await (await prisma.package.findMany()).map(packageT => {
             return { ...packageT, id :'package000'+ packageT.id.toString()}
        })
      return [...inventoryProducts,...inventoryPackages] as unknown
    } catch (error) {
      console.log(error)
    }

}
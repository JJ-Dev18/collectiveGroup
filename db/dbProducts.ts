import { IPackage } from "fleed/interfaces";
import prisma from "./db"


const bcrypt = require('bcrypt');




export const getInventory = async() => {

    
    try {
        const inventoryProducts  = await prisma.product.findMany()
        const inventoryPackages = await prisma.package.findMany()
      return [...inventoryProducts,inventoryPackages] as unknown
    } catch (error) {
      console.log(error)
    }

}
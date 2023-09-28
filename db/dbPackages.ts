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

export const getPackageById = async (id:number)=> {
  try {
    const packaged = await prisma.package.findUnique({
      where : {
       id : id
      },
    })
    const serviceOnPackage = await prisma.serviceOnPackage.findMany({
      where : {
        packageId : id 
      },
      select: {
        service: true
      }
    })

    let services = serviceOnPackage.sort((a,b)=> a.service.id - b.service.id).map( service => {
       return service.service
    })
    
    return {...packaged, services}

  } catch (error) {
     console.log(error)
  }
}
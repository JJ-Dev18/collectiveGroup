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

export const getProductById = async (id:number)=> {
  try {
    const product = await prisma.product.findUnique({
      where : {
       id : id
      },
    })
    const benefitsProduct = await prisma.benefitOnProducts.findMany({
      where : {
        productId : id 
      },
      select: {
        benefit: true
      }
    })

    let benefits = benefitsProduct.sort((a,b)=> a.benefit.id - b.benefit.id).map( benefit => {
       return benefit.benefit
    })
    
    return {...product, benefits}

  } catch (error) {
     console.log(error)
  }
}
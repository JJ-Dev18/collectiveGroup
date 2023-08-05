import prisma from "./db"


export const getProducts = async () => {

   const data = await prisma.product.findMany()
   console.log(data)
   return data;
}
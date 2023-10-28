import prisma from 'fleed/db/db';
import { IProduct } from 'fleed/interfaces/product';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =  {message: string} | IProduct[] | [];



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getInventory(req,res)
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}




export const getInventory = async( req: NextApiRequest, res :NextApiResponse) => {

    
    try {
     
      const inventoryProducts  = await prisma.product.findMany()
      // const inventoryPackages = await prisma.package.findMany()
      res.status(200).json(inventoryProducts)
    } catch (error) {
      console.log(error)
    }

}
import prisma from 'fleed/db/db';
import { IProduct } from 'fleed/interfaces/product';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =  {message: string} | IProduct[] | [];



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getProducts(req,res)
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}



 const getProducts = async( req: NextApiRequest, res :NextApiResponse)=> {

    const data = await prisma.product.findMany({
        include: {
           benefits : {
             select : {
                benefit : true
             }
           }
        }
       
    })
    
    res.status(200).json(data)
 }
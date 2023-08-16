import prisma from 'fleed/db/db';
import { IProduct } from 'fleed/interfaces/product';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =  {message: string} | IProduct[] | [];



export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getSales(req,res)
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}

 



 const getSales = async( req: NextApiRequest, res :NextApiResponse)=> {

    const data = await prisma.saleDetailProduct.findMany({
        select: {
            quantity: true,
            price:true,
            subtotal : true,
            
           sale : {
             include:{
                user : {
                    select:{
                        name: true,
                        email : true,

                    }
                },
                
             }
           }
        }
       
    })
    
    res.status(200).json(data)
 }
import prisma from 'fleed/db/db';
import { IProduct } from 'fleed/interfaces/product';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = | {message: string} |any;


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getProducts(req,res)
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}

 const getProducts = async( req: NextApiRequest, res :NextApiResponse<Data>)=> {

    const data = await prisma.benefitOnProducts.findMany({
        select: {
           product : {
            include : {
                benefits : {
                    select : {
                        benefit : true 
                    }
                }
            }
           }
        }
       
    })
    console.log(data)
    res.status(200).json(data)
 }
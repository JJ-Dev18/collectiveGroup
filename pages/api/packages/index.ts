import prisma from 'fleed/db/db';
import { IProduct } from 'fleed/interfaces/product';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =  {message: string} | IProduct[] | [];



export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getPackages(req,res)
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}

 const getPackages = async( req: NextApiRequest, res :NextApiResponse)=> {

    const data = await prisma.package.findMany({
        include: {
           services : {
             select : {
                service : true
             }
           }
        }
       
    })
    
    res.status(200).json(data)
 }
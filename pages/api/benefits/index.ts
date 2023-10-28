import prisma from 'fleed/db/db';
import { Benefit } from 'fleed/interfaces';
import { IProduct } from 'fleed/interfaces/product';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =  {message: string} | Benefit[] | [];



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getBenefits(req,res)
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}

 const getBenefits = async( req: NextApiRequest, res :NextApiResponse)=> {

    const data = await prisma.benefit.findMany()
    
    res.status(200).json(data)
 }
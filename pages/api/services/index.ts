import prisma from 'fleed/db/db';
import { IService} from 'fleed/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =  {message: string} | IService[] | [];



export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getServices(req,res)
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}

 

 const getServices = async( req: NextApiRequest, res :NextApiResponse)=> {

    const data = await prisma.service.findMany()
    res.status(200).json(data)
 }
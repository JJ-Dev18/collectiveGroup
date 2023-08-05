import { getProducts } from 'fleed/db/dbProducts'
import { IProduct } from 'fleed/interfaces/product';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = | {message: string} | IProduct[] | IProduct;


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getProducts()
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}






import type { NextApiRequest, NextApiResponse } from "next";


import prisma from "fleed/db/db";
import { IUser } from '../../../../interfaces/user';

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };
   
type Users={
    users : IUser[] | []
}    

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Users>
) {
  switch (req.method) {
   
    case 'GET': 
      return getDashboard(req,res)
    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}



const getDashboard = async ( req: NextApiRequest, res: NextApiResponse) => {

    const [
        numberOfOrders,
        numberOfPackages,
        numberOfClients,
        numberOfProducts,
       
    ] = await Promise.all([
        prisma.sale.count(),
        prisma.package.count(),
        prisma.user.count(),
        prisma.product.count(),
        
    ]);
 return res.status(200).json({
    numberOfOrders,
    numberOfPackages,
    numberOfClients,
    numberOfProducts,
});

}




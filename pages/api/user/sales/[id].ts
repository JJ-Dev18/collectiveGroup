import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "fleed/db/db";

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getSales(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const getSales = async (
  req: NextApiRequest,
  res: NextApiResponse) => {
  const {
    id:idUser ,
    
  } = req.query ;
  
    const sales = await prisma.sale.findMany({
      include:{
          saleProducts :{
              include: {
                  product : true
              }
          },
          user : true
      },
      where:{
          user: {
              id : Number(idUser)
          }
      },
      orderBy: {
        createdAt : "asc"
      }
   })
 
   return res.status(200).json(sales)
  

};

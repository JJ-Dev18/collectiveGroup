import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require('bcrypt');


import prisma from "fleed/db/db";
import { validations , jwt } from "fleed/utils";
import { ISales } from "fleed/interfaces";

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
    id ,
    
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
            id : Number(id)
        }
    }
 })

 return res.status(200).json(sales)
};

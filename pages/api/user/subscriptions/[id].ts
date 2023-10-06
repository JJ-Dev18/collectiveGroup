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
    id:idUser ,
    
  } = req.query ;
  if(idUser !== undefined){
    const subscription = await prisma.subscription.findMany({
      include:{
        
         subscriptionPackage :{
            include:{
              
                package : true
            }
         }
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
   
   return res.status(200).json(subscription)
  }

};

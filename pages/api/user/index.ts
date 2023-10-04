import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require('bcrypt');


import prisma from "fleed/db/db";
import { validations , jwt } from "fleed/utils";
import { ISales, IUser } from "fleed/interfaces";

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
    case "PUT":
      return updateUser(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const updateUser = async (
  req: NextApiRequest,
  res: NextApiResponse) => {
  const data = req.body  as IUser;
  let hashedPassword = undefined
  
    if(data.password){
        hashedPassword =  bcrypt.hashSync(data.password,2)
    }   
  const user = await prisma.user.update({
    data:{
        email : data.email,
        name : data.name,
        hashedPassword :hashedPassword
        
    },
    where : {
        id : data.id
    }
  })

 return res.status(200).json(user)
};

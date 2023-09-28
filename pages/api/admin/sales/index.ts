import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require('bcrypt');


import prisma from "fleed/db/db";
import { validations , jwt } from "fleed/utils";
import { IUser } from '../../../../interfaces/user';
import { Role } from "@prisma/client";

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
    case "POST":
      return createSale(req, res);
    case 'GET': 
      return getSales(req,res)
    case 'PUT':
        return updatedUser(req,res)  
    case 'DELETE':
        return deleteUser(req,res)    
    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const deleteUser = async ( req: NextApiRequest, res: NextApiResponse) => {

    const {
        id = 1,
      } = req.body as { id: number;};

    const user = await prisma.user.delete({
        where: {
            id : id
        }
    })
    return res.status(200).json({ message: 'User Deleted' });
}

const getSales = async ( req: NextApiRequest, res: NextApiResponse) => {

 const sales = await prisma.sale.findMany({
    include:{
        saleProducts :{
            include: {
                product : true
            }
        },
        user : true
    }
 })
 
 return res.status(200).json(sales);

}

const updatedUser = async ( req: NextApiRequest, res: NextApiResponse) => {

    
    const {
        id = 1,
        role = 'ADMIN',
       
      } = req.body as { id: number; role: Role | undefined };

   

    const validRoles = ['ADMIN','USER'];
    if ( !validRoles.includes(role) ) {
        return res.status(400).json({ message: 'Rol no permitido: ' + validRoles.join(', ') })
    }
    const user = await prisma.user.update({
        where: {
            id: id,
          },
          data:{
            role : role
          }
    })
    if ( !user ) {
        return res.status(404).json({ message: 'User not found: ' + id });
    }
  
    
    return res.status(200).json({ message: 'User Updated' });
   
   }


const createSale = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res.status(400).json({
      message: "La contraseña debe de ser de 6 caracteres",
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: "El nombre debe de ser de 2 caracteres",
    });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: "El correo no tiene formato de correo",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(400).json({
      message: "No puede usar ese correo",
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password,2);
    const newUser = await prisma.user.create({
      data: {
        email: email.toLocaleLowerCase(),
        name,
        role: "USER",
        hashedPassword,
      },
    });
    const { id, role } = newUser;

    const token = jwt.signToken(id, email);

    return res.status(200).json({
      token, //jwt
      user: {
        email,
        role,
        name,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }
};

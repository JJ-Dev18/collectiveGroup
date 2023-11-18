import type { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require('bcrypt');


import prisma from "fleed/db/db";
import { validations , jwt } from "fleed/utils";
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
    case "POST":
      return registerUser(req, res);
    case 'GET': 
      return getUsers(req,res)
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
    
    const subscriptionsActives = await prisma.subscription.findFirst({
      where:{
        user : {
          id : id
        }
      }
    })  
    const salesActives = await prisma.sale.findFirst({
      where : {
        user :{
          id : id 
        }
      }
    })
    if(subscriptionsActives){
      return res.status(200).json({ error :'No se puede eliminar, existe una subscripcion Activa'})
    }
    if(salesActives){
      return res.status(200).json({ error :'No se puede eliminar, existen compras hechas por este usuario'})
    }
    
    
    const user = await prisma.user.delete({
        where: {
            id : id
        }
    })
    return res.status(200).json({ message: 'User Deleted' });
}

const getUsers = async ( req: NextApiRequest, res: NextApiResponse) => {

 const users = await prisma.user.findMany()
 
 return res.status(200).json(users);

}

const updatedUser = async ( req: NextApiRequest, res: NextApiResponse) => {

    
    const {
        id = 1,
        role = 'ADMIN',
        name = '',
        email= ''
       
      } = req.body as { id: number; role: "USER" | "ADMIN"| undefined , name : string,email : string};

    const validRoles = ['ADMIN','USER'];
    if ( !validRoles.includes(role) ) {
        return res.status(400).json({ message: 'Rol no permitido: ' + validRoles.join(', ') })
    }
    try {
      
      const user = await prisma.user.update({
          where: {
              id: id,
            },
            data:{
              role : role,
              name : name,
              email : email,
           
            }
      })
      if ( !user ) {
          return res.status(404).json({ message: 'User not found: ' + id });
      }
    
      return res.status(200).json({ message: 'User Updated' });
    } catch (error) {
      console.log(error)
    }
    
   
   }


const registerUser = async (
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
    (error);
    return res.status(500).json({
      message: "Revisar logs del servidor",
    });
  }
};

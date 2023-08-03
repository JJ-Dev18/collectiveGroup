const bcrypt = require('bcrypt');
import prisma from './db';


// const user = await prisma.user.create({
//   data: {
//     email,
//     name,
//     hashedPassword
//   }
// });


export const checkUserEmailPassword = async( email: string, password: string ) => {

    // await db.connect();
   
    const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (!user || !user?.hashedPassword) {
        return null
      }

      const isCorrectPassword = await bcrypt.compare(
        password,
        user.hashedPassword
      );

      if (!isCorrectPassword) {
        return null
      }

    const { role, name, id } = user;

    return {
        id,
        email: email.toLocaleLowerCase(),
        role,
        name,
    }
}
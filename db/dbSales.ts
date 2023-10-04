import prisma from "./db"


export const getUserSalesById = async (id:number) => {

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
                id : id 
            }
        }
     })
     

     return sales
}
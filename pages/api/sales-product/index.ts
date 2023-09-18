import prisma from 'fleed/db/db';
import { IProduct } from 'fleed/interfaces/product';
import type { NextApiRequest, NextApiResponse } from 'next'
import { CartEntry } from 'use-shopping-cart/core';

type Data =  {message: string} | IProduct[] | [];



export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getSales(req,res)
        case 'POST' :
            return createSale(req,res)  
        case 'PUT' :
            return paidSale(req,res)   
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}

 



 const getSales = async( req: NextApiRequest, res :NextApiResponse)=> {

    const data = await prisma.saleDetailProduct.findMany({
        select: {
            quantity: true,
            price:true,
            subtotal : true,
            product: {
              select :{
                name: true,
                price: true
              }
            },
           sale : {
             include:{
                user : {
                    select:{
                        name: true,
                        email : true,

                    }
                },
                
             }
           }
        }
       
    })
    
    res.status(200).json(data)
 }

 const createSale = async (req: NextApiRequest, res :NextApiResponse)=> {
  
    const {
        clienteId= 0,
        products = []
       
      } = req.body as { clienteId: number, products : Array<CartEntry> };
    try {
        const newSale = await prisma.sale.create({
            data:{
                 clienteId : clienteId
            }
            
        });
        products.forEach(async (product) => {
            // let type = product.id.slice(0,7)
            let id = Number(product.id.slice(7))
            // console.log(type,"type")
           
                  await prisma.saleDetailProduct.create({
                   data : {
                    saleId : newSale.id,
                    productId : id,
                    quantity : product.quantity,
                    subtotal : product.value || product.price,
                    price : product.price
                   }
                })
          
        });
       res.status(200).json(newSale)

    } catch (error) {
        console.log(error)
    } 

 }

 const paidSale = async (req: NextApiRequest, res :NextApiResponse )=>{
    const {
        paymentResult ,
        isPaid ,
        paidAt,
        transactionId,
        city = "",
        country= "",
        id,
       
      } = req.body as { paymentResult: string, isPaid : boolean ,paidAt:string,transactionId : string, city :string,country:string,id: number};
      

     const saleUpdated =  await prisma.sale.update({
        where :{
            id
        },
        data : { paymentResult ,isPaid,paidAt,transactionId,city,country,}
     })

     res.status(200).json(saleUpdated) 

 }
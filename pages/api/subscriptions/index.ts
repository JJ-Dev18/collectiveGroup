import prisma from 'fleed/db/db';
import { IProduct } from 'fleed/interfaces/product';
import type { NextApiRequest, NextApiResponse } from 'next'
import { CartEntry } from 'use-shopping-cart/core';

type Data =  {message: string} | IProduct[] | [];



export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getSubscriptions(req,res)
        case 'POST' :
            return createSubscription(req,res)  
        case 'PUT' :
            return paidSubscription(req,res)   
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}

 



 const getSubscriptions = async( req: NextApiRequest, res :NextApiResponse)=> {

    const data = await prisma.subscriptionDetailPackage.findMany({
        select: {
            quantity: true,
            price:true,
            subtotal : true,
            package: {
              select :{
                name: true,
                price: true
              }
            },
           subscription : {
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

 const createSubscription = async (req: NextApiRequest, res :NextApiResponse)=> {
  
    const {
        clienteId= 0,
        packageSub = { quantity :1 , subtotal : 0, price : 0, id :1 }
       
      } = req.body as { clienteId: number, packageSub :CartEntry };
    try {
        const newSubscription = await prisma.subscription.create({
            data:{
                 clienteId : clienteId
            }
            
        });
        let id = Number(packageSub.id)
        await prisma.subscriptionDetailPackage.create({
            data : {
             subscriptionId : newSubscription.id,
             packageId : id,
             quantity : packageSub.quantity || 1,
             subtotal :  packageSub.price,
             price : packageSub.price
            }
         })    
       res.status(200).json(newSubscription)

    } catch (error) {
        console.log(error)
    } 

 }

 const paidSubscription = async (req: NextApiRequest, res :NextApiResponse )=>{
    const {
        paymentResult ,
        isPaid ,
        paidAt,
        transactionId,
        city = "",
        country= "",
        id,
       
      } = req.body as { paymentResult: string, isPaid : boolean ,paidAt:string,transactionId : string, city :string,country:string,id: number};
      
     console.log(req.body)
     const subscriptionUpdated =  await prisma.subscription.update({
        where :{
            id
        },
        data : { paymentResult ,isPaid,paidAt,transactionId,city,country,}
     })

     res.status(200).json(subscriptionUpdated) 

 }
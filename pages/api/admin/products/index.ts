import { Benefit } from '@prisma/client';
import prisma from 'fleed/db/db';
import { ItemInterface } from 'fleed/interfaces';
import { IProduct } from 'fleed/interfaces/product';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =  {message: string} | IProduct[] | [];



export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getProducts(req,res)
        case 'POST':  
            return createProduct(req,res)    
        case 'PUT':
            return updateProduct(req,res)    
        case 'DELETE':
            return deleteProduct(req,res)
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}

const deleteProduct = async( req: NextApiRequest, res :NextApiResponse)=> {

 const { id = 1} = req.body as { id : number}

 await prisma.benefitOnProducts.deleteMany({
   where : {
    productId : id 
   }
 })

   await prisma.product.delete({
   where : {
    id : id 
  }
 })

 return res.status(200).json({ message: 'Product Deleted' });

}

 const createProduct = async( req: NextApiRequest, res :NextApiResponse)=> {
   
    const {
        name= '',
        price = 1,
        brochure ='',
        benefits= []
      } = req.body as { name: string;brochure: string, price: number; benefits:Benefit[] };

    const newProduct = await prisma.product.create({
        data: {
           name: name,
           price : price,
           currency : 'usd',
           brochure : brochure,
           createdAt : new Date()
        },
      });
      benefits.forEach(async (benefit) => {

                await prisma.benefitOnProducts.create({
                 data : {
                  benefitId : benefit.id,
                  productId : newProduct.id       
                 }
              })
              
      
    });

      res.status(200).json({...newProduct,benefits : [...benefits]})
 }

 
 const updateProduct =  async( req: NextApiRequest, res :NextApiResponse)=> {
 
  const data = req.body as  IProduct

  // console.log(data)
  const subscriptionUpdated =  await prisma.product.update({
    where :{
        id : data.id
    },
    data : { 
      name : data.name,
      price : data.price,
      brochure : data?.brochure || ''
    }
 })

 const benefitsProduct = await prisma.benefitOnProducts.findMany({
  where : {
    productId : data.id
  },
  select: {
    benefit: true
  }
})

let benefits = benefitsProduct.map( benefit => {
   return benefit.benefit
})

 const difference = benefits.filter( (benefit:any) => data.benefits?.includes(benefit) )
 console.log(difference,data.benefits,"difference")
//  const benefitsProductUpdated = await prisma.benefitOnProducts.updateMany({
//   where :{
//     productId : data.id
// },
//   data : { 

//   }
//  })
  res.status(200).json({message : 'Product updated'})

 }


 const getProducts = async( req: NextApiRequest, res :NextApiResponse)=> {

    const data = await prisma.product.findMany({
        include: {
           benefits : {
             select : {
               benefit : true 
             }
           }
        }
       
    })
    
    res.status(200).json(data)
 }
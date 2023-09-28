import { Benefit } from '@prisma/client';
import prisma from 'fleed/db/db';
import { ItemInterface } from 'fleed/interfaces';
import { IProduct } from 'fleed/interfaces/product';
import { comparatorArray } from 'fleed/utils/arrayComparator';
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
 
  const {
    name= '',
    price = 1,
    id = 1 ,
    brochure ='',
    benefits= []
  } = req.body as  {id:number, name: string;brochure: string, price: number; benefits:Benefit[] };
  
  try {
    
    const productUpdated =  await prisma.product.update({
      where :{
          id : id
      },
      data : { 
        name : name,
        price : price,
        brochure : brochure || ''
      }
   })
   const benefitsProduct = await prisma.benefitOnProducts.findMany({
    where : {
      productId : id 
    },
    select: {
      benefit: true
    }
  })

  let benefitsBefore = benefitsProduct.sort((a,b)=> a.benefit.id - b.benefit.id).map( benefit => {
     return benefit.benefit
  })
  
  let newBenefits = comparatorArray(benefits,benefitsBefore)
  let oldBenefits = comparatorArray(benefitsBefore,benefits)

  newBenefits.forEach( async (benefit)=> {
    await prisma.benefitOnProducts.create({
                    data : {
                      benefitId : benefit.id,
                      productId : id       
                    }
                  })
  })

  oldBenefits.forEach( async (benefit) => {
   await prisma.benefitOnProducts.delete({
     where:{
        productId_benefitId :{productId : id , benefitId : benefit.id}
     }
   })
 })  
  
  res.status(200).json({message : 'Product updated'})
  } catch (error) {
    console.log(error)
    console.log(typeof error)
  }


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
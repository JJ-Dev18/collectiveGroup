import prisma from 'fleed/db/db';
import { IService } from 'fleed/interfaces';
import { IProduct } from 'fleed/interfaces/product';
import { comparatorArray } from 'fleed/utils/arrayComparator';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =  {message: string} | IProduct[] | [];



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch (req.method) {
        case 'GET':
            return getPackages(req,res)
        case 'POST':  
            return createPackage(req,res)    
        case 'PUT':
            return updatePackage(req,res)    
        case 'DELETE':
            return deletePackage(req,res)
        default:
            res.status(200).json({ message: 'Endpoint no existe' })
       }
       
}

const deletePackage = async( req: NextApiRequest, res :NextApiResponse)=> {

 const { id = 1} = req.body as { id : number}

 await prisma.serviceOnPackage.deleteMany({
   where : {
    packageId : id 
   }
 })

   await prisma.package.delete({
   where : {
    id : id 
  }
 })

 return res.status(200).json({ message: 'Package Deleted' });

}

 const createPackage = async( req: NextApiRequest, res :NextApiResponse)=> {
   
    const {
        name= '',
        price = 1,
        description ='',
        comments = '',
        services= []
      } = req.body as { name: string;description: string,  comments : string ,price: number; services:IService[] };

    const newPackage = await prisma.package.create({
        data: {
           name: name,
           price : price,
           currency : 'usd',
           description : description,
           comments : comments,
           createdAt : new Date()
        },
      });
      services.forEach(async (service) => {

                await prisma.serviceOnPackage.create({
                 data : {
                  serviceId : service.id,
                  packageId : newPackage.id       
                 }
              })
              
      
    });

      res.status(200).json({...newPackage,benefits : [...services]})
 }

 
 const updatePackage =  async( req: NextApiRequest, res :NextApiResponse)=> {
 
  const {
    name= '',
    price = 1,
    id = 1 ,
    description ='',
    services= [],
    comments= ''
  } = req.body as  {id:number, name: string;description: string, price: number; comments:string, services:IService[] };
  
  try {
    
    const packageUpdated =  await prisma.package.update({
      where :{
          id : id
      },
      data : { 
        name : name,
        price : price,
        description : description || '',
        comments : comments,
      }
   })
   const servicesPackage = await prisma.serviceOnPackage.findMany({
    where : {
      packageId : id 
    },
    select: {
      service: true
    }
  })

  let benefitsBefore = servicesPackage.sort((a:any,b:any)=> a.service.id - b.service.id).map( (service:any) => {
     return service.service
  })
  
  let newServices = comparatorArray(services,benefitsBefore)
  let oldServices = comparatorArray(benefitsBefore,services)

  newServices.forEach( async (service)=> {
    await prisma.serviceOnPackage.create({
                    data : {
                      serviceId : service.id,
                      packageId : id       
                    }
                  })
  })

  oldServices.forEach( async (service) => {
   await prisma.serviceOnPackage.delete({
     where:{
        packageId_serviceId :{packageId : id , serviceId : service.id}
     }
   })
 })  
  
  res.status(200).json({message : 'Product updated'})
  } catch (error) {
    console.log(error)
    console.log(typeof error)
  }


 }


 const getPackages = async( req: NextApiRequest, res :NextApiResponse)=> {

    const data = await prisma.package.findMany({
        include: {
           services : {
             select : {
               service : true 
             }
           }
        }
       
    })
    
    res.status(200).json(data)
 }
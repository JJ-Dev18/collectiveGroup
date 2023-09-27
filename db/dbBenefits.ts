import prisma from "./db"

export const getBenefits = async() => {

    
    try {
      const benefits = await prisma.benefit.findMany()
      return benefits
    } catch (error) {
      console.log(error)
    }

}
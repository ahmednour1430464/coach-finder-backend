import { PrismaClient } from ".prisma/client"

export const appendCoach=async(id:number,prisma:PrismaClient)=>{
   try {
    const coach =await prisma.coach.findUnique({
        where:{
          userId:id  
        },
        select:{
            id:true,
            firstName:true,
            lastName:true,
            description:true,
            areas:true,
            hourlyRate:true,
        }
    })
    return coach
   } catch (error) {
       throw error  
   }
}


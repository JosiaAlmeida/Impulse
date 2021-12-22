import { prismaClient } from "../prisma"

class GetLast3MessagesService{
    async execute(){

        //selecionando as 3 ultimas mensagens
        const messages = await prismaClient.message.findMany({
            take: 3,
            orderBy:{
                created_at: 'desc'
            },
            include:{
                user: true
            }
        })
        return messages
    }
}

export {GetLast3MessagesService}
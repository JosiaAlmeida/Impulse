import {Request, Response} from 'express'
import {AuthenticateUserService} from '../services/AuthenticateUserService'

class AuthenticateUserController{

    async handle(req: Request, res: Response){
        //Lembrar de colocar dinamicamente
        const code = "3ed3ab5b2fe97667d15c"

        const service = new AuthenticateUserService()
        try {
            const result =await service.execute(code)
            return res.json(result)
        } catch (error) {
            throw error
        }
    }

}

export {AuthenticateUserController}
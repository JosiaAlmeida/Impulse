import {Request, Response} from 'express'
import {AuthenticateUserService} from '../services/AuthenticateUserService'

class AuthenticateUserController{

    async handle(req: Request, res: Response){
        //Lembrar de colocar dinamicamente
        const code = "a65b017bdac734067f8f"

        const service = new AuthenticateUserService()

        const result =await service.execute(code)

        return res.json(result)
    }

}

export {AuthenticateUserController}
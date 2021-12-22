import axios from 'axios'
import {prismaClient} from '../prisma/'
import {sign} from 'jsonwebtoken'
/**
 * Receber code(string)
 * Recuperar o access_token no github
 * Recuperar info do github
 * Verificar se existe na DB
 * Sim -- Gerar um Token
 * Nao -- Criar na DB e gerar Token
 * Retornar o token com as infos do user
 */

interface IAccessTokenResponse{
    access_token: string
}

interface IUserResponse{
    avatar_url: string
    login: string
    id: number
    name: string
}

class AuthenticateUserService{

    async execute(code: string){
        const url = "https://github.com/login/oauth/access_token"

        const {data : accessTokenReponse} = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                "Accept": "application/json"
            }
        })

        const response = await axios.get<IUserResponse>("https://api.github.com/user",{
            headers:{
                authorization: `Bearer ${accessTokenReponse.access_token}`
            }
        })

        const {login, id, avatar_url, name} = response.data

        //pegando usuario existente na db
        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        //Criando novo usuario
        if(!user){
            user = await prismaClient.user.create({
                data:{
                    github_id: id,
                    login,
                    name,
                    avatar_url
                }
            })
        }

        //Criando um token
        const token = sign(
            {
                user:{
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        )

        return {
            token,
            user
        }
    }
}

export {AuthenticateUserService}
import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'
import { GetLast3MessagesController } from './controllers/GetLast3MessagesController'
import { ProfileUserController } from './controllers/ProfileUserController'
import { ensureAuthenticated } from './middleware/ensureAuthenticated'

const router = Router()
const Auth = new AuthenticateUserController()
const createMessage = new CreateMessageController() 
const Last3Message = new GetLast3MessagesController()
const profileUser = new ProfileUserController()

router.post("/authenticate", Auth.handle)

//Rota com autenticacao
router.post("/messages", ensureAuthenticated, createMessage.handle)

router.get("/messages/last3", Last3Message.handle)

router.get("/profile", ensureAuthenticated, profileUser.handle)

export {router}
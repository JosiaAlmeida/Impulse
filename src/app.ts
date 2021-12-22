import "dotenv/config"
import express from 'express'
import bodyparser from 'body-parser'
import {Server, Socket} from 'socket.io'
import http from 'http'

import {router} from './routes'

const app = express()

//configurando server
const serverHttp = http.createServer(app)
const io = new Server(serverHttp, {
    cors:{
        origin: "*"
    }
})

io.on("connection", socket=>{
    console.log("Usuario conectado no socket "+ socket.id)
})

app.use(router)

//permitindo json no express
//app.use(express.json())

//body parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.get("/github",(req, res)=>{
    //Redirecionando para o github
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get("/signin/callback",(req, res)=>{
    //pegando parametro da url
    const {code} = req.query

    return res.json(code)
})


export {serverHttp, io}
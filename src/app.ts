import "dotenv/config"
import express from 'express'
import bodyparser from 'body-parser'

import {router} from './routes'

const app = express()

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

app.listen((4000), ()=> console.log("Servidor rodando na porta 4000"))
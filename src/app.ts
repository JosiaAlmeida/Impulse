import "dotenv/config"
import express from 'express'

const app = express()

app.get("/github",(req, res)=>{
    //Redirecionando para o github
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get("/signin/callback",(req, res)=>{
    //pegando parametro da url
    const {code} = req.query

    return res.json(code)
})

app.listen((4000), ()=> console.log("Servidor rodando na porta 3000"))
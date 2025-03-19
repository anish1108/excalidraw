import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "./config";


const app = express();

app.use(express.json());

app.post("/signup",(req, res)=>{
    res.send("signup")
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // zod validation
    res.send("signup")
    
})

app.post("/signin", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    // db call

    
    const token = jwt.sign({
        username
    },JWT_SECRET)
    

    res.send(token)

})

app.post("/room", middleware, (req, res)=>{
    res.send("create room")
})

app.listen(3001,()=>{
    console.log("Port is started on 3000")
});
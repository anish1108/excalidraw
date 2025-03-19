import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backendcommon/config";
import { UserSchema, SigninSchema, RoomSchema } from "@repo/common/types"



const app = express();

app.use(express.json());

app.post("/signup",(req, res)=>{
    res.send("signup")
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const data = UserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "Incorrect data"
        })
        return;
    }

    // zod validation
    res.send("signup")
    
})

app.post("/signin", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const data = SigninSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "Incorrect data"
        })
        return;
    }

    // db call

    
    const token = jwt.sign({
        username
    },JWT_SECRET)
    

    res.send(token)

})

app.post("/room", middleware, (req, res)=>{

    const data = RoomSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Incorrect data"
        })
        return;
    }
    res.send("create room")
})

app.listen(3001,()=>{
    console.log("Port is started on 3000")
});
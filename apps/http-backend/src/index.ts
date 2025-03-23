import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backendcommon/config";
import { UserSchema, SigninSchema, RoomSchema } from "@repo/common/types"
import { prisma } from "@repo/db/client"

// const JWT_SECRET = "12345";

const app = express();

app.use(express.json());

app.post("/signup",async (req, res)=>{

    const data = UserSchema.safeParse(req.body);
    console.log(data)
    if(!data.success){
        res.json({
            message : "Incorrect data"
        })
        return;
    }
    try {
        await prisma.user.create({
            data: {
                email: data.data.email,
                password: data.data.password,
                avatar: data.data.avatar,
                name: data.data.name
            }
        })
    } catch (error) {
        console.log("error IS " + error)
    }
        
   

    // zod validation
    res.send("signup")
    
})

app.post("/signin",async (req, res)=>{

    const data = SigninSchema.safeParse(req.body);
    const email = data.data?.email;
    if(!data.success){
        res.json({
            message : "Incorrect data"
        })
        return;
    }

    // db call
    try {
        const user = await prisma.user.findFirst({
            where:{
                email: data.data.email,
                password: data.data.password
            }
        })
        
    } catch (error) {
        console.log("user not found")
        console.log("error is " + error)
    }
    
    const token = jwt.sign({
        email
    },JWT_SECRET)
    

    res.send(token)

})

app.post("/room", middleware, async(req, res)=>{

    const data = RoomSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Incorrect data"
        })
        return;
    }
    
    const room = await prisma.room.create({
        data: {
            slug : "12345",
            adminId : "admin",
        }
    })
    res.send("create room")
})

app.listen(3001,()=>{
    console.log("Port is started on 3001")
});
import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backendcommon/config";
const wss = new WebSocketServer({port:8080});

// const JWT_SECRET = "12345";

wss.on("connection", function connection(ws, request){

    const url = request.url;
    if(!url){
        return;
    }
    const queryparams = new URLSearchParams(url.split("?")[1])   //ws://localhost:3000?token=122345
    const token = queryparams.get("token") || "";
    const decoded = jwt.verify(token, JWT_SECRET)
    if(!decoded || !(decoded as JwtPayload).userId){
        ws.close();
        return;
    }


    ws.on("message", function message(data){
        ws.send("pong")
    })
})
import {WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backendcommon/config";
const wss = new WebSocketServer({port:8080});

interface User {
    ws : WebSocket,
    userId : string,
    room : string[]
}

let users: User[] = [];

wss.on("connection", function connection(ws, request){
    console.log(JWT_SECRET)

    const url = request.url;
    if(!url){
        console.log("url fail")
        return;
    }
    const queryparams = new URLSearchParams(url.split("?")[1])   //ws://localhost:3000?token=122345
    const token = queryparams.get("token") || "";
    const decoded = jwt.verify(token, JWT_SECRET)
    if(!decoded || !(decoded as JwtPayload).email){
        console.log(decoded)
        console.log("decoding fail")
        ws.close();
        return;
    }

    users.push({
        userId: (decoded as JwtPayload).email,
        room: [],
        ws
    })


    ws.on("message", function message(data){
        let parsedData; 
        if(typeof(data) !== "string"){
            parsedData = JSON.parse(data.toString());
        }else{
            parsedData = JSON.parse(data);
        }

        if(parsedData.type == "join_room"){
            const user = users.find((x)=>x.ws === ws);
            user?.room.push(parsedData.roomId);
            if(!user){
                console.log("User not found");
                return;
            }
            // user.ws = ws
            // user.userId = (decoded as JwtPayload).email;
            user.room.push(parsedData.roomId) ;
        }

        if(parsedData.type == "chat"){
            users.forEach(user => {
                if(user.room.includes(parsedData.roomId)){
                    user.ws.send(parsedData.message);
                }
            });
        }
    })
})
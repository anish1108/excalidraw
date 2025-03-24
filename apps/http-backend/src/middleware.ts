import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backendcommon/config";

// const JWT_SECRET = "12345";

export function middleware (req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log("jwt is " + JWT_SECRET)
    console.log("decode is " + decoded)

    if(decoded){
        // @ts-ignore
        req.userId = decoded.userId;
        console.log("req is " + req)
        next();
    }else{
        res.status(403).json({
            message: "unauthorized"
        })
    }
}
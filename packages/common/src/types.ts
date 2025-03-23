import {  z } from "zod";
// const { z } = require("zod")

export const UserSchema = z.object({
    email: z.string(),
    password : z.string(),
    name : z.string(),
    avatar: z.string()
})

export const SigninSchema = z.object({
    email : z.string(),
    password : z.string()
})

export const RoomSchema = z.object({
    name : z.string().min(3).max(20)
})
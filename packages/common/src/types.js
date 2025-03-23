"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = exports.SigninSchema = exports.UserSchema = void 0;
var zod_1 = require("zod");
// const { z } = require("zod")
exports.UserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    name: zod_1.z.string(),
    avatar: zod_1.z.string()
});
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.RoomSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(20)
});

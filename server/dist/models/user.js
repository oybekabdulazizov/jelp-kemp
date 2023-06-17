"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    // username: {
    //   type: String,
    //   required: true,
    // },
    // hash: {
    //   type: String,
    //   required: true,
    // },
});
UserSchema.plugin(passport_local_mongoose_1.default);
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;

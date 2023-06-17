"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import bcrypt from 'bcrypt';
const utils_1 = require("../utils");
const user_1 = __importDefault(require("../models/user"));
// import AppError from '../AppError';
const passport_1 = __importDefault(require("passport"));
const userRouter = express_1.default.Router();
userRouter.post('/register', (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        const user = new user_1.default({ email, username });
        const registeredUser = yield user_1.default.register(user, password);
        res.json(registeredUser);
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
    // const hash: string = await bcrypt.hash(password, 10);
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   throw new AppError(400, 'Username is already taken.');
    // }
    // const newUser = new User({ email, username, hash });
    // await newUser.save();
    // res.json(newUser);
})));
userRouter.post('/login', (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            throw err;
        }
        if (info) {
            return res.status(401).json(info);
        }
        if (user)
            return res.status(200).json(user);
    })(req, res, next);
    console.log(req.user);
    //   passport.authenticate('local', (err: any, user: any, info: any) => {
    //     if (!user) {
    //       return res.send(info.message);
    //     }
    //     req.logIn(user, (err) => {
    //       return res.send('Successfully authenticated!');
    //     });
    //   })(req, res, next);
})));
exports.default = userRouter;

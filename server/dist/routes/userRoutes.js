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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const user_1 = __importDefault(require("../models/user"));
const AppError_1 = __importDefault(require("../AppError"));
// import passport from 'passport';
const userRouter = express_1.default.Router();
// userRouter.get('/user', (req: Request, res: Response, next: NextFunction) => {
//   console.log('inside getuser endpoint');
//   console.log(req.cookies);
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, 'jwt-secret-key-so-private', {}, (err, user) => {
//       if (err) {
//         throw new AppError(500, err.message);
//       }
//       console.log('user from jwt.verify');
//       console.log(user);
//       res.json(user);
//     });
//   } else {
//     res.json(null);
//   }
// });
userRouter.post('/register', utils_1.validateSignupFormData, (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const userWithExistingEmail = yield user_1.default.findOne({ email });
    if (userWithExistingEmail)
        throw new AppError_1.default(400, 'Email already taken.');
    const userWithExistingUsername = yield user_1.default.findOne({ username });
    if (userWithExistingUsername)
        throw new AppError_1.default(400, 'Username already taken.');
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const newUser = new user_1.default({ email, username, password: hashedPassword });
    yield newUser.save();
    jsonwebtoken_1.default.sign({
        user_id: newUser._id,
        username: newUser.username,
        user_email: newUser.email,
    }, 'jwt-secret-key-so-private', {}, (err, token) => {
        if (err)
            throw new AppError_1.default(500, err.message);
        res.cookie('token', token, { httpOnly: true }).json({
            user_id: newUser._id,
            username: newUser.username,
            user_email: newUser.email,
        });
        console.log('inside register');
        console.log(req.cookies);
    });
    // try {
    //   const { email, username, password } = req.body;
    //   const user = new User({ email, username });
    //   await User.register(user, password);
    //   res.status(200).json({
    //     user_id: user._id,
    //     username: username,
    //     user_email: email,
    //   });
    // } catch (err: any) {
    //   return next(err);
    // }
    // const { email, username, password } = req.body;
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   throw new AppError(400, 'Username is already taken.');
    // }
    // const hashpassword: string = await bcrypt.hash(password, 10);
    // const newUser = new User({ email, username, hashpassword });
    // await newUser.save();
    // req.session.save((err) => {
    //   if (err) return next(err);
    // });
    // req.user = {
    //   user_id: newUser._id,
    //   username: newUser.username,
    //   user_email: newUser.email,
    // };
    // res.json(req.user);
})));
// userRouter.get('/user', (req: Request, res: Response) => {
//   console.log(req.user);
//   res.send(req.user);
// });
userRouter.post('/login', utils_1.validateLoginFormData, (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.default.findOne({
        $or: [{ username: username }, { email: username }],
    });
    if (!user)
        throw new AppError_1.default(400, 'Username or password is incorrect.');
    const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatches)
        throw new AppError_1.default(400, 'Username or password is incorrect.');
    jsonwebtoken_1.default.sign({
        user_id: user._id,
        username: user.username,
        user_email: user.email,
    }, 'jwt-secret-key-so-private', {}, (err, token) => {
        if (err)
            throw new AppError_1.default(500, err.message);
        res.cookie('token', token, { httpOnly: true }).json({
            user_id: user._id,
            username: user.username,
            user_email: user.email,
        });
        console.log('inside login');
        console.log(req.cookies);
    });
    // await passport.authenticate('local', (err: any, user: any, info: any) => {
    //   if (err) {
    //     console.log(err);
    //     throw err;
    //   }
    //   if (info) {
    //     console.log(info);
    //     return res.status(401).json(info);
    //   }
    //   if (user) {
    //     req.logIn(user, (err) => {
    //       req.user = user;
    //       if (err) throw err;
    //     });
    //     res.status(200).json({
    //       user_id: user._id,
    //       username: user.username,
    //       user_email: user.email,
    //     });
    //   }
    // })(req, res, next);
    // await passport.authenticate('local', (err: any, user: any, info: any) => {
    //   if (err) return next(err);
    //   if (info) {
    //     res.status(401).send(info.message);
    //   }
    //   if (user) {
    //     req.logIn(user, (err) => {
    //       if (err) return next(err);
    //       req.session.save((err) => {
    //         if (err) return next(err);
    //       });
    //       return res.send(user);
    //       // return res.json({
    //       //   user_id: user._id,
    //       //   username: user.username,
    //       //   user_email: user.email,
    //       // });
    //     });
    //   }
    // })(req, res, next);
})));
userRouter.get('/logout', (req, res, next) => {
    res.clearCookie('token');
    res.status(200).send('Logged you out.');
});
exports.default = userRouter;

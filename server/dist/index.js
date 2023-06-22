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
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const safe_1 = __importDefault(require("colors/safe"));
// import session from 'express-session';
// import passport from 'passport';
// import { Strategy } from 'passport-local';
// import bcrypt from 'bcrypt';
// import User from './models/user';
const AppError_1 = __importDefault(require("./AppError"));
const campgroundRoutes_1 = __importDefault(require("./routes/campgroundRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const error = safe_1.default.red;
(0, mongoose_1.connect)('mongodb://127.0.0.1:27017/jelp-kemp')
    .then(() => {
    console.log('Database connected...');
})
    .catch((err) => {
    console.log(error('***** FAILED TO CONNECT TO MONGODB *****'));
    console.log(err.message);
});
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// app.use(
//   session({
//     secret: 'justasecretfornow',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//     },
//   })
// );
// express session must come before passport sesion.
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(
//   // new LocalStrategy(User.authenticate())
//   new Strategy(async (username, password, done) => {
//     const existingUser = await User.findOne({ username });
//     if (!existingUser)
//       return done(null, false, {
//         message: 'Username or password is incorrect.',
//       });
//     const passwordMatches = await bcrypt.compare(
//       password,
//       existingUser.password
//     );
//     if (!passwordMatches) {
//       return done(null, false, {
//         message: 'Username or password is incorrect.',
//       });
//     }
//     return done(null, {
//       user_id: existingUser._id,
//       username: existingUser.username,
//       user_email: existingUser.email,
//     });
//   })
// );
// passport.serializeUser(User.serializeUser());
// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// // passport.deserializeUser(User.deserializeUser());
// passport.deserializeUser((id, done) => {
//   User.findById({ _id: id }, (err: any, user: any) => {
//     done(err, user);
//   });
// });
app.use('/campgrounds', campgroundRoutes_1.default);
app.use('/campgrounds/:campground_id/reviews', reviewRoutes_1.default);
app.use(userRoutes_1.default);
app.get('*', (req, res, next) => {
    next(new AppError_1.default(404, 'Page Not Found!'));
});
app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code = 500, message = 'Something went wrong!' } = err;
    let updatedCode = code;
    let updatedMessage = message;
    if (message.includes('Cast to ObjectId failed')) {
        updatedCode = 404;
        updatedMessage = 'Campground Not Found!';
    }
    res.status(updatedCode).send(updatedMessage);
}));
app.listen('3001', () => {
    console.log('Listening to port 3001...');
});

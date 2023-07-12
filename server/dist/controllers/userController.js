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
exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const user_1 = __importDefault(require("../models/user"));
const AppError_1 = __importDefault(require("../AppError"));
exports.signup = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    const userWithExistingEmail = yield user_1.default.findOne({ email });
    if (userWithExistingEmail)
        return res.json({ error: 'Email already taken.' });
    const userWithExistingUsername = yield user_1.default.findOne({ username });
    if (userWithExistingUsername)
        return res.json({ error: 'Username already taken' });
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
    });
}));
exports.login = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.default.findOne({
        $or: [{ username: username }, { email: username }],
    });
    if (!user)
        return res.json({ error: 'Username or password is incorrect.' });
    const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatches)
        return res.json({ error: 'Username or password is incorrect.' });
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
    });
}));
const logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).send('Logged you out.');
};
exports.logout = logout;

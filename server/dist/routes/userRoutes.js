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
const utils_1 = require("../utils");
const user_1 = __importDefault(require("../models/user"));
const AppError_1 = __importDefault(require("../AppError"));
const userRouter = express_1.default.Router();
userRouter.post('/register', (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const hash = yield bcrypt_1.default.hash(password, 10);
    const existingUser = yield user_1.default.findOne({ username });
    if (existingUser) {
        throw new AppError_1.default(400, 'Username is already taken.');
    }
    const newUser = new user_1.default({ email, username, hash });
    yield newUser.save();
    res.json(newUser);
})));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.default = userRouter;

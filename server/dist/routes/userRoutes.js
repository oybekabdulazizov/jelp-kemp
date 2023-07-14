"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.post('/register', middlewares_1.validateSignupFormData, userController_1.signup);
userRouter.post('/login', middlewares_1.validateLoginFormData, userController_1.login);
userRouter.get('/logout', userController_1.logout);
exports.default = userRouter;

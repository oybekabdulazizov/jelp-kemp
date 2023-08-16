"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeRouter = express_1.default.Router();
homeRouter.get('/', (req, res, next) => {
    res.send('Welcome to JelpKemp!');
});
exports.default = homeRouter;

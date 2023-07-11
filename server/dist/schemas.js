"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchemaJoi = exports.signupSchemaJoi = exports.reviewSchemaJoi = exports.campgroundSchemaJoi = void 0;
const joi_1 = __importDefault(require("joi"));
exports.campgroundSchemaJoi = joi_1.default.object({
    title: joi_1.default.string().max(100).required(),
    location: joi_1.default.string().max(100).required(),
    price: joi_1.default.number().min(0).max(1000).required(),
    image: joi_1.default.string().max(250).required(),
    description: joi_1.default.string().max(1000).required(),
});
exports.reviewSchemaJoi = joi_1.default.object({
    rating: joi_1.default.number().required().min(1).max(5),
    text: joi_1.default.string().max(1000).required(),
});
exports.signupSchemaJoi = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().max(100).required(),
    password: joi_1.default.string().min(8).max(64).required(),
});
exports.loginSchemaJoi = joi_1.default.object({
    username: joi_1.default.string().max(100).required(),
    password: joi_1.default.string().min(8).max(64).required(),
});

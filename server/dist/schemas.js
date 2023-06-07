"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.campgroundSchemaJoi = void 0;
const joi_1 = __importDefault(require("joi"));
exports.campgroundSchemaJoi = joi_1.default.object({
    title: joi_1.default.string().max(100).required(),
    location: joi_1.default.string().max(100).required(),
    price: joi_1.default.number().min(0).max(1000).required(),
    image: joi_1.default.string().max(250).required(),
    description: joi_1.default.string().max(1000).required(),
});

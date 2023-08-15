"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchemaJoi = exports.signupSchemaJoi = exports.reviewSchemaJoi = exports.campgroundSchemaJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!',
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = (0, sanitize_html_1.default)(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value)
                    return helpers.error('string.escapeHTML', { value });
                return clean;
            },
        },
    },
});
const JoiWithExtension = joi_1.default.extend(extension);
exports.campgroundSchemaJoi = JoiWithExtension.object({
    title: JoiWithExtension.string().max(100).required().escapeHTML(),
    location: JoiWithExtension.string().max(100).required().escapeHTML(),
    price: joi_1.default.number().min(0).max(1000).required(),
    description: JoiWithExtension.string().max(1000).required().escapeHTML(),
});
exports.reviewSchemaJoi = JoiWithExtension.object({
    rating: joi_1.default.number().required().min(1).max(5),
    text: JoiWithExtension.string().max(1000).required().escapeHTML(),
});
exports.signupSchemaJoi = JoiWithExtension.object({
    email: JoiWithExtension.string().email().required().escapeHTML(),
    username: JoiWithExtension.string().max(100).required().escapeHTML(),
    password: JoiWithExtension.string().min(8).max(64).required().escapeHTML(),
});
exports.loginSchemaJoi = JoiWithExtension.object({
    username: JoiWithExtension.string().max(100).required().escapeHTML(),
    password: JoiWithExtension.string().min(8).max(64).required().escapeHTML(),
});

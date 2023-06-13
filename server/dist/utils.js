"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.validateReviewFormData = exports.validateCampgroundFormData = void 0;
const schemas_1 = require("./schemas");
const AppError_1 = __importDefault(require("./AppError"));
const validateCampgroundFormData = (req, res, next) => {
    const { title, location, price, image, description } = req.body;
    const { error } = schemas_1.campgroundSchemaJoi.validate({
        title,
        location,
        price,
        image,
        description,
    });
    if (error) {
        throw new AppError_1.default(400, error.details[0].message);
    }
    else {
        next();
    }
};
exports.validateCampgroundFormData = validateCampgroundFormData;
const validateReviewFormData = (req, res, next) => {
    const { rating, text } = req.body;
    const { error } = schemas_1.reviewSchemaJoi.validate({ rating, text });
    if (error) {
        console.dir(error);
        throw new AppError_1.default(400, error.details[0].message);
    }
    else {
        next();
    }
};
exports.validateReviewFormData = validateReviewFormData;
const asyncHandler = (func) => (req, res, next) => {
    func(req, res, next).catch(next);
};
exports.asyncHandler = asyncHandler;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginFormData = exports.validateSignupFormData = exports.validateReviewFormData = exports.validateCampgroundFormData = void 0;
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
const validateSignupFormData = (req, res, next) => {
    const { email, username, password } = req.body;
    const { error } = schemas_1.signupSchemaJoi.validate({ email, username, password });
    if (error) {
        console.dir(error);
        throw new AppError_1.default(400, error.details[0].message);
    }
    else {
        next();
    }
};
exports.validateSignupFormData = validateSignupFormData;
const validateLoginFormData = (req, res, next) => {
    const { username, password } = req.body;
    const { error } = schemas_1.loginSchemaJoi.validate({ username, password });
    if (error) {
        console.dir(error);
        throw new AppError_1.default(400, error.details[0].message);
    }
    else {
        next();
    }
};
exports.validateLoginFormData = validateLoginFormData;

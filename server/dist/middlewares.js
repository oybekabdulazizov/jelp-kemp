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
exports.isLoggedIn = exports.isReviewAuthor = exports.isAuthor = exports.validateLoginFormData = exports.validateSignupFormData = exports.validateReviewFormData = exports.validateCampgroundFormData = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schemas_1 = require("./schemas");
const AppError_1 = __importDefault(require("./AppError"));
const utils_1 = require("./utils");
const campground_1 = __importDefault(require("./models/campground"));
const review_1 = __importDefault(require("./models/review"));
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
exports.isAuthor = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const campground = yield campground_1.default.findById(_id);
    const result = jsonwebtoken_1.default.verify(req.cookies.token, 'jwt-secret-key-so-private', {});
    if (!(campground === null || campground === void 0 ? void 0 : campground.author.equals(result.user_id))) {
        return res.json({
            error: 'Oops! You do not have permission to edit this campground.',
        });
    }
    next();
}));
exports.isReviewAuthor = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { review_id } = req.params;
    const review = yield review_1.default.findById(review_id);
    const result = jsonwebtoken_1.default.verify(req.cookies.token, 'jwt-secret-key-so-private', {});
    if (!(review === null || review === void 0 ? void 0 : review.author.equals(result.user_id))) {
        return res.json({
            error: 'Oops! You do not have permission to edit or delete this review.',
        });
    }
    next();
}));
exports.isLoggedIn = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ error: 'Please log in to leave a review.' });
    }
    next();
}));

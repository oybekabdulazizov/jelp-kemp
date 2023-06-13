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
exports.asyncHandler = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const campground_1 = __importDefault(require("../models/campground"));
const AppError_1 = __importDefault(require("../AppError"));
const review_1 = __importDefault(require("../models/review"));
const reviewRouter = express_1.default.Router();
const asyncHandler = (func) => (req, res, next) => {
    func(req, res, next).catch(next);
};
exports.asyncHandler = asyncHandler;
reviewRouter.post('/', utils_1.validateReviewFormData, (0, exports.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const campground = yield campground_1.default.findById(req.params.campground_id);
    if (!campground)
        return next(new AppError_1.default(404, 'Campground Not Found!'));
    const { rating, text } = req.body;
    const review = new review_1.default({ rating, text });
    campground.reviews.push(review);
    yield review.save();
    yield campground.save();
    res.status(200).send();
})));
reviewRouter.delete('/:review_id', (0, exports.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { campground_id, review_id } = req.params;
    yield review_1.default.findByIdAndDelete(review_id);
    yield campground_1.default.findByIdAndUpdate(campground_id, {
        $pull: { reviews: review_id },
    });
    res.status(200).send();
})));
exports.default = reviewRouter;

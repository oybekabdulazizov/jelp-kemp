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
exports.deleteReview = exports.addReview = void 0;
const utils_1 = require("../utils");
const campground_1 = __importDefault(require("../models/campground"));
const review_1 = __importDefault(require("../models/review"));
exports.addReview = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { campground_id } = req.params;
    const campground = yield campground_1.default.findById(campground_id);
    if (!campground)
        return res.json({ error: 'Campground not found!' });
    const { rating, text } = req.body;
    const review = new review_1.default({ rating, text });
    campground.reviews.push(review);
    yield review.save();
    yield campground.save();
    res.json({ message: 'Review added.' });
}));
exports.deleteReview = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { campground_id, review_id } = req.params;
    yield review_1.default.findByIdAndDelete(review_id);
    yield campground_1.default.findByIdAndUpdate(campground_id, {
        $pull: { reviews: review_id },
    });
    res.json({ message: 'Review deleted.' });
}));

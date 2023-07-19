"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const reviewController_1 = require("../controllers/reviewController");
const reviewRouter = express_1.default.Router({ mergeParams: true });
reviewRouter.post('/', middlewares_1.isLoggedIn, middlewares_1.validateReviewFormData, reviewController_1.addReview);
reviewRouter.delete('/:review_id', middlewares_1.isLoggedIn, middlewares_1.isReviewAuthor, reviewController_1.deleteReview);
exports.default = reviewRouter;

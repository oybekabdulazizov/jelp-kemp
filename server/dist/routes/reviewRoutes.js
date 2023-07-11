"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const reviewController_1 = require("../controllers/reviewController");
const reviewRouter = express_1.default.Router({ mergeParams: true });
reviewRouter.post('/', utils_1.validateReviewFormData, reviewController_1.addReview);
reviewRouter.delete('/:review_id', reviewController_1.deleteReview);
exports.default = reviewRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating cannot be below 1.'],
        max: [5, 'Rating cannot exceed 5.'],
    },
    text: {
        type: String,
        required: true,
        maxLength: [1000, 'Review cannot exceed 1000 characters'],
    },
});
const Review = (0, mongoose_1.model)('Review', ReviewSchema);
exports.default = Review;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CampgroundSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
        type: String,
        required: true,
        maxLength: [1000, 'Description cannot exceed 1000 characters'],
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be lower than 0'],
        max: [1000, 'Price cannot be higher than 1000'],
    },
    location: {
        type: String,
        required: true,
        maxLength: [100, 'Location cannot exceed 250 characters'],
    },
    image: {
        type: String,
        maxLength: [250, 'Image Url length cannot exceed 250 characters'],
        required: true,
    },
    reviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});
const Campground = (0, mongoose_1.model)('Campground', CampgroundSchema);
exports.default = Campground;

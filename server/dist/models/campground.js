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
const mongoose_1 = require("mongoose");
const review_1 = __importDefault(require("./review"));
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
CampgroundSchema.post('findOneAndDelete', function (campground) {
    return __awaiter(this, void 0, void 0, function* () {
        if (campground) {
            yield review_1.default.deleteMany({
                _id: {
                    $in: campground.reviews,
                },
            });
        }
    });
});
const Campground = (0, mongoose_1.model)('Campground', CampgroundSchema);
exports.default = Campground;

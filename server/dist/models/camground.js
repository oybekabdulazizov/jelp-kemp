"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CampgroundSchema = new mongoose_1.Schema({
    title: String,
    price: String,
    description: String,
    location: String,
});
const Campground = (0, mongoose_1.model)('Campground', CampgroundSchema);
exports.default = Campground;

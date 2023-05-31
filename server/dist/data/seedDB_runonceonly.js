"use strict";
// const mongoose = require('mongoose');
// const Campground = require('../models/campground');
// const cities = require('./cities.json');
// const descriptors = require('./discriptors.json');
// const places = require('./places.json');
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
const campground_1 = __importDefault(require("../models/campground"));
const cities_json_1 = __importDefault(require("./cities.json"));
const descriptors_json_1 = __importDefault(require("./descriptors.json"));
const places_json_1 = __importDefault(require("./places.json"));
// const connect = mongoose.connect;
(0, mongoose_1.connect)('mongodb://127.0.0.1:27017/jelp-kemp')
    .then(() => {
    console.log('Database connected...');
})
    .catch((err) => {
    console.log('ERROR OCCURRED WHILE CONNECTING TO THE DATABASE:');
    console.log(err);
});
const getRadnomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield campground_1.default.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const rand1000 = Math.floor(Math.random() * cities_json_1.default.length);
        const campground = new campground_1.default({
            title: `${getRadnomItem(descriptors_json_1.default)} ${getRadnomItem(places_json_1.default)}`,
            location: `${cities_json_1.default[rand1000].city}, ${cities_json_1.default[rand1000].state}`,
        });
        campground.save();
    }
});
seedDB();

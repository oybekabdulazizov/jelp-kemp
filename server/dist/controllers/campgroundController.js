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
exports.getCampground = exports.deleteCampground = exports.editCampground = exports.createCampground = exports.getCampgrounds = void 0;
const utils_1 = require("../utils");
const campground_1 = __importDefault(require("../models/campground"));
const AppError_1 = __importDefault(require("../AppError"));
exports.getCampgrounds = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const campgrounds = yield campground_1.default.find({});
    res.json(campgrounds);
}));
exports.createCampground = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newCampground = new campground_1.default(Object.assign({}, req.body));
    yield newCampground.save();
    res.status(200).send();
}));
exports.editCampground = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const campground = yield campground_1.default.findById(_id);
    if (!campground)
        return next(new AppError_1.default(404, 'Campground Not Found!'));
    yield campground_1.default.findByIdAndUpdate(_id, Object.assign({}, req.body), { runValidators: true });
    res.status(200).send();
}));
exports.deleteCampground = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    yield campground_1.default.findByIdAndDelete(_id);
    res.status(200).send();
}));
exports.getCampground = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const campground = yield campground_1.default.findById(_id).populate('reviews');
    if (!campground)
        return next(new AppError_1.default(404, 'Campground Not Found!'));
    res.json(campground);
}));

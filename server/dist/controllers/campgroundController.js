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
exports.getCampgrounds = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const campgrounds = yield campground_1.default.find({});
    res.json(campgrounds);
}));
exports.createCampground = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    /*
    let images: Array<{ url: string; filename: string }> = req.files?.map(
      (file) => ({ url: file.path, filename: file.filename })
    );
    Unable to proceed with the above mapping function as there currently seems to be
    an issue with req.files array/dictionary.
    Most of the array functions of req.files are not working and popping an error similar to below.
    "This expression is not callable.
    Not all constituents of type
    'File[] | (<U>(callbackfn: (value: File, index: number, array: File[]) => U, thisArg?: any) =>
      U[])' are callable.
    Type 'File[]' has no call signatures.ts(2349)"
    
    As a workaround, the maximum images to be uploaded has been set as 5. Once the issue is resolved
    or a better workaround is found, the code will be updated accordingly.
    */
    const newCampground = new campground_1.default(Object.assign({}, req.body));
    try {
        const img0 = {
            url: req.files[0].path,
            filename: req.files[0].filename,
        };
        (_a = newCampground.images) === null || _a === void 0 ? void 0 : _a.push(img0);
        const img1 = {
            url: req.files[1].path,
            filename: req.files[1].filename,
        };
        (_b = newCampground.images) === null || _b === void 0 ? void 0 : _b.push(img1);
        const img2 = {
            url: req.files[2].path,
            filename: req.files[2].filename,
        };
        (_c = newCampground.images) === null || _c === void 0 ? void 0 : _c.push(img2);
        const img3 = {
            url: req.files[3].path,
            filename: req.files[3].filename,
        };
        (_d = newCampground.images) === null || _d === void 0 ? void 0 : _d.push(img3);
        const img4 = {
            url: req.files[4].path,
            filename: req.files[4].filename,
        };
        (_e = newCampground.images) === null || _e === void 0 ? void 0 : _e.push(img4);
    }
    catch (err) {
        next;
    }
    yield newCampground.save();
    res.json({
        message: 'Campground created successfully.',
    });
}));
exports.editCampground = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const campground = yield campground_1.default.findById(_id);
    if (!campground)
        return res.json({ error: 'Campground Not Found!' });
    yield campground_1.default.findByIdAndUpdate(_id, Object.assign({}, req.body), { runValidators: true });
    res.json({
        message: 'Campground modified successfully.',
    });
}));
exports.deleteCampground = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    yield campground_1.default.findByIdAndDelete(_id);
    res.json({
        message: 'Campground deleted successfully.',
    });
}));
exports.getCampground = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const campground = yield campground_1.default.findById(_id)
        .populate({ path: 'reviews', populate: { path: 'author' } })
        .populate('author');
    if (!campground)
        return res.json({ error: 'Campground not found!' });
    res.json(campground);
}));

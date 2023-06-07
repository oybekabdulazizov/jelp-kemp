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
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const safe_1 = __importDefault(require("colors/safe"));
const AppError_1 = __importDefault(require("./AppError"));
const campground_1 = __importDefault(require("./models/campground"));
const schemas_1 = require("./schemas");
const error = safe_1.default.red;
(0, mongoose_1.connect)('mongodb://127.0.0.1:27017/jelp-kemp')
    .then(() => {
    console.log('Database connected...');
})
    .catch((err) => {
    console.log(error('***** FAILED TO CONNECT TO MONGODB *****'));
    console.log(err.message);
});
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const validateCampgroundFormData = (req, res, next) => {
    const { error } = schemas_1.campgroundSchemaJoi.validate(req.body);
    if (error) {
        throw new AppError_1.default(400, error.details[0].message);
    }
    else {
        next();
    }
};
const asyncHandler = (func) => (req, res, next) => {
    func(req, res, next).catch(next);
};
app.get('/campgrounds', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    const campgrounds = yield campground_1.default.find({});
    res.json(campgrounds);
    // } catch (err: any) {
    //   console.log(error('***** GET - Unexpected error occurred *****'));
    //   next(err);
    // }
})));
app.post('/campgrounds', validateCampgroundFormData, asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    const newCampground = new campground_1.default(Object.assign({}, req.body));
    yield newCampground.save();
    res.status(200).send();
    // } catch (err: any) {
    //   console.log(error('***** POST - Campground Validation Failed *****'));
    //   next(err);
    // }
})));
app.put('/campgrounds/:_id', validateCampgroundFormData, asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    // try {
    yield campground_1.default.findByIdAndUpdate(_id, Object.assign({}, req.body), { runValidators: true });
    res.status(200).send();
    // } catch (err: any) {
    //   console.log(error('***** PUT - Campground Update Failed *****'));
    //   next(err);
    // }
})));
app.delete('/campgrounds/:_id', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    // try {
    yield campground_1.default.findByIdAndDelete(_id);
    res.status(200).send();
    // } catch (err) {
    //   console.log(error('***** DELETE - Campground Deletion Failed *****'));
    //   next(err);
    // }
})));
app.get('/campgrounds/:_id', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    const { _id } = req.params;
    const campground = yield campground_1.default.findById(_id);
    if (!campground)
        return next(new AppError_1.default(404, 'Campground Not Found!'));
    res.json(campground);
    // } catch (err: any) {
    //   console.log(error('***** GET(id) - Campground Not Found *****'));
    //   next(new AppError(404, 'Not Found!'));
    // }
})));
app.get('*', (req, res, next) => {
    next(new AppError_1.default(404, 'Page Not Found!'));
});
app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code = 500, message = 'Something went wrong!' } = err;
    let updatedCode = code;
    let updatedMessage = message;
    if (message.includes('Cast to ObjectId failed')) {
        updatedCode = 400;
        updatedMessage = 'Campground Not Found!';
    }
    res.status(updatedCode).send(updatedMessage);
}));
app.listen('3001', () => {
    console.log('Listening to port 3001...');
});

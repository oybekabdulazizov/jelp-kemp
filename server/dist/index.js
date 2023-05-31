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
const campground_1 = __importDefault(require("./models/campground"));
(0, mongoose_1.connect)('mongodb://127.0.0.1:27017/jelp-kemp')
    .then(() => {
    console.log('Database connected...');
})
    .catch((err) => {
    console.log('ERROR OCCURRED WHILE CONNECTING TO THE DATABASE:');
    console.log(err);
});
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/campgrounds', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const campgrounds = yield campground_1.default.find({});
    res.json(campgrounds);
}));
app.post('/campgrounds', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCampground = new campground_1.default(Object.assign({}, req.body));
    newCampground.save();
    res.status(200).send({ code: 200, status: 'OK', msg: 'CREATED' });
}));
app.put('/campgrounds/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    yield campground_1.default.findByIdAndUpdate(_id, Object.assign({}, req.body.campground));
    res.status(200).send({ code: 200, status: 'OK', msg: 'PUT_UPDATED' });
}));
app.delete('/campgrounds/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    yield campground_1.default.findByIdAndDelete(_id);
    res.status(200).send({ code: 200, status: 'OK', msg: 'DELETED' });
}));
app.get('/campgrounds/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const campground = yield campground_1.default.findById(_id);
    res.json(campground);
}));
app.listen('3001', () => {
    console.log('Listening to port 3001...');
});

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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const safe_1 = __importDefault(require("colors/safe"));
const AppError_1 = __importDefault(require("./AppError"));
const campgroundRoutes_1 = __importDefault(require("./routes/campgroundRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
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
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'DELETE,GET,HEAD,PATCH,POST,PUT',
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/campgrounds', campgroundRoutes_1.default);
app.use('/campgrounds/:campground_id/reviews', reviewRoutes_1.default);
app.use(userRoutes_1.default);
app.get('*', (req, res, next) => {
    next(new AppError_1.default(404, 'Page Not Found!'));
});
app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code = 500, message = 'Something went wrong!' } = err;
    let updatedCode = code;
    let updatedMessage = message;
    if (message.includes('jwt must be provided')) {
        updatedCode = 401;
        updatedMessage = 'You do not have permission to delete this campground.';
    }
    if (message.includes('Cast to ObjectId failed')) {
        updatedCode = 404;
        updatedMessage = 'Campground Not Found!';
    }
    console.log('err: ');
    console.log(err);
    res.status(updatedCode).send(updatedMessage);
}));
app.listen('3001', () => {
    console.log('Listening to port 3001...');
});

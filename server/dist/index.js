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
const camground_1 = __importDefault(require("./models/camground"));
(0, mongoose_1.connect)('mongodb://127.0.0.1:27017/jelp-kemp')
    .then(() => {
    console.log('Database connected...');
})
    .catch((err) => {
    console.log('ERROR OCCURRED WHILE CONNECTING TO THE DATABASE:');
    console.log(err);
});
const app = (0, express_1.default)();
app.get('/makecampground', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const camp = new camground_1.default({
        title: 'My Backyard',
        price: '1',
        description: 'Cheap camping :)',
        location: 'Warsaw, Poland',
    });
    yield camp.save();
    res.send(camp);
}));
app.listen('3001', () => {
    console.log('Listening to port 3001...');
});

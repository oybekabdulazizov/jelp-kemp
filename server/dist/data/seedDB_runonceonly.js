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
const campground_1 = __importDefault(require("../models/campground"));
const cities_json_1 = __importDefault(require("./cities.json"));
const descriptors_json_1 = __importDefault(require("./descriptors.json"));
const places_json_1 = __importDefault(require("./places.json"));
(0, mongoose_1.connect)('mongodb://127.0.0.1:27017/jelp-kemp')
    .then(() => {
    console.log('Database connected...');
})
    .catch((err) => {
    console.log('ERROR OCCURRED WHILE CONNECTING TO THE DATABASE:');
    console.log(err);
});
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomPrice = () => {
    return Math.floor(Math.random() * (40 - 20) + 20);
};
// const getImage = async (title: string): Promise<string> => {
//   const resData = await axios
//     .get(
//       `https://api.unsplash.com/search/photos?page=1&query=${title}&client_id=7pj-OlBlzzw1ZTtPE7n5QMRHPXdvLCntLGOl-7SAT0c`
//     )
//     .then((res) => res.data);
//   if (!resData) {
//     return '';
//   }
//   return resData.results[0].urls.full;
// };
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // await Campground.deleteMany({});
    const citiesSliced = cities_json_1.default.slice(0, 100);
    for (let i = 0; i < 50; i++) {
        const randFrom100 = Math.floor(Math.random() * citiesSliced.length);
        const title = `${getRandomItem(descriptors_json_1.default)} ${getRandomItem(places_json_1.default)}`;
        const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies, nunc eu hendrerit volutpat, quam neque accumsan tellus, vel molestie arcu purus non velit. Mauris sagittis non nibh et laoreet. Sed viverra orci ipsum, quis lobortis dui eleifend at. Quisque quis felis elit. Donec ut convallis orci, ac egestas ipsum. Suspendisse viverra nulla in erat rutrum hendrerit. Donec facilisis massa et tincidunt maximus. Ut sit amet augue ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam malesuada volutpat ligula, vel tincidunt neque scelerisque varius. Sed lorem tortor, dignissim non arcu eu, convallis luctus metus. Quisque nec dignissim leo, quis condimentum felis. Donec ut eros lectus. Nullam at mi suscipit, sodales justo eget, tempus arcu. Etiam hendrerit est ac diam elementum tristique.';
        const price = getRandomPrice();
        const location = `${citiesSliced[randFrom100].city}, ${citiesSliced[randFrom100].state}`;
        const image = '';
        const campground = new campground_1.default({
            title,
            description,
            price,
            location,
            image,
        });
        campground.save();
    }
});
seedDB();

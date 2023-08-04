"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const middlewares_1 = require("../middlewares");
const campgroundController_1 = require("../controllers/campgroundController");
const campgroundRouter = express_1.default.Router({ mergeParams: true });
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        let filename = file.fieldname +
            '_' +
            Date.now().toString().replace(/:/g, '-') +
            path_1.default.extname(file.originalname);
        cb(null, filename);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter });
campgroundRouter.get('/', campgroundController_1.getCampgrounds);
campgroundRouter.post('/', upload.single('image'), middlewares_1.validateCampgroundFormData, (req, res, next) => {
    console.log(req.body, req.file);
    res.json({
        body: req.body,
        file: req.file,
    });
});
campgroundRouter.put('/:_id', middlewares_1.validateCampgroundFormData, middlewares_1.isCampgroundAuthor, campgroundController_1.editCampground);
campgroundRouter.delete('/:_id', middlewares_1.isCampgroundAuthor, campgroundController_1.deleteCampground);
campgroundRouter.get('/:_id', campgroundController_1.getCampground);
exports.default = campgroundRouter;

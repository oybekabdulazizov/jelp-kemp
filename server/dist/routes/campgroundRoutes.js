"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const middlewares_1 = require("../middlewares");
const campgroundController_1 = require("../controllers/campgroundController");
const cloudinary_1 = require("../cloudinary");
const campgroundRouter = express_1.default.Router({ mergeParams: true });
const storage = cloudinary_1.cloudinaryStorage;
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
campgroundRouter.post('/', upload.array('images'), middlewares_1.validateCampgroundFormData, campgroundController_1.createCampground);
campgroundRouter.put('/:_id', middlewares_1.validateCampgroundFormData, middlewares_1.isCampgroundAuthor, campgroundController_1.editCampground);
campgroundRouter.delete('/:_id', middlewares_1.isCampgroundAuthor, campgroundController_1.deleteCampground);
campgroundRouter.get('/:_id', campgroundController_1.getCampground);
exports.default = campgroundRouter;

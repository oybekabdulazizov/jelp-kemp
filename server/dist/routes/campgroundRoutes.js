"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const campgroundController_1 = require("../controllers/campgroundController");
const campgroundRouter = express_1.default.Router({ mergeParams: true });
campgroundRouter.get('/', campgroundController_1.getCampgrounds);
campgroundRouter.post('/', middlewares_1.validateCampgroundFormData, campgroundController_1.createCampground);
campgroundRouter.put('/:_id', middlewares_1.validateCampgroundFormData, middlewares_1.isAuthor, campgroundController_1.editCampground);
campgroundRouter.delete('/:_id', campgroundController_1.deleteCampground);
campgroundRouter.get('/:_id', campgroundController_1.getCampground);
exports.default = campgroundRouter;

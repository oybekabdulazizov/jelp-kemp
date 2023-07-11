"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const campgroundController_1 = require("../controllers/campgroundController");
const campgroundRouter = express_1.default.Router({ mergeParams: true });
campgroundRouter.get('/', campgroundController_1.getCampgrounds);
campgroundRouter.post('/', utils_1.validateCampgroundFormData, campgroundController_1.createCampground);
campgroundRouter.put('/:_id', utils_1.validateCampgroundFormData, campgroundController_1.editCampground);
campgroundRouter.delete('/:_id', campgroundController_1.deleteCampground);
campgroundRouter.get('/:_id', campgroundController_1.getCampground);
exports.default = campgroundRouter;

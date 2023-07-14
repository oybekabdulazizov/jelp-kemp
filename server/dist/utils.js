"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (func) => (req, res, next) => {
    func(req, res, next).catch(next);
};
exports.asyncHandler = asyncHandler;

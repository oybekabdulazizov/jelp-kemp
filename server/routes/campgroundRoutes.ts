import express, { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';

import { isCampgroundAuthor, validateCampgroundFormData } from '../middlewares';
import {
  createCampground,
  deleteCampground,
  editCampground,
  getCampground,
  getCampgrounds,
} from '../controllers/campgroundController';
import { cloudinaryStorage } from '../cloudinary';

const campgroundRouter: Router = express.Router({ mergeParams: true });

const storage = cloudinaryStorage;

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

campgroundRouter.get('/', getCampgrounds);

campgroundRouter.post(
  '/',
  upload.array('images', 5),
  validateCampgroundFormData,
  createCampground
);

campgroundRouter.put(
  '/:_id',
  upload.array('images', 5),
  validateCampgroundFormData,
  isCampgroundAuthor,
  editCampground
);

campgroundRouter.delete('/:_id', isCampgroundAuthor, deleteCampground);

campgroundRouter.get('/:_id', getCampground);

export default campgroundRouter;

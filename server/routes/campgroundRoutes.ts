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
  upload.array('images'),
  validateCampgroundFormData,
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body, req.files);
    res.json({
      body: req.body,
      files: req.files,
    });
  }
);

campgroundRouter.put(
  '/:_id',
  validateCampgroundFormData,
  isCampgroundAuthor,
  editCampground
);

campgroundRouter.delete('/:_id', isCampgroundAuthor, deleteCampground);

campgroundRouter.get('/:_id', getCampground);

export default campgroundRouter;

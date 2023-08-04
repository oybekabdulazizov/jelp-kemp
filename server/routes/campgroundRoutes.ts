import express, { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import path from 'path';

import { isCampgroundAuthor, validateCampgroundFormData } from '../middlewares';
import {
  createCampground,
  deleteCampground,
  editCampground,
  getCampground,
  getCampgrounds,
} from '../controllers/campgroundController';

const campgroundRouter: Router = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    let filename: string =
      file.fieldname +
      '_' +
      Date.now().toString().replace(/:/g, '-') +
      path.extname(file.originalname);
    cb(null, filename);
  },
});

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

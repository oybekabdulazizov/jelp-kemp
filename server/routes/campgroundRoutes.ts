import express, { Router } from 'express';

import { isCampgroundAuthor, validateCampgroundFormData } from '../middlewares';
import {
  createCampground,
  deleteCampground,
  editCampground,
  getCampground,
  getCampgrounds,
} from '../controllers/campgroundController';

const campgroundRouter: Router = express.Router({ mergeParams: true });

campgroundRouter.get('/', getCampgrounds);

campgroundRouter.post('/', validateCampgroundFormData, createCampground);

campgroundRouter.put(
  '/:_id',
  validateCampgroundFormData,
  isCampgroundAuthor,
  editCampground
);

campgroundRouter.delete('/:_id', isCampgroundAuthor, deleteCampground);

campgroundRouter.get('/:_id', getCampground);

export default campgroundRouter;

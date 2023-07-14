import express, { Router } from 'express';

import { validateReviewFormData } from '../middlewares';
import { addReview, deleteReview } from '../controllers/reviewController';

const reviewRouter: Router = express.Router({ mergeParams: true });

reviewRouter.post('/', validateReviewFormData, addReview);

reviewRouter.delete('/:review_id', deleteReview);

export default reviewRouter;

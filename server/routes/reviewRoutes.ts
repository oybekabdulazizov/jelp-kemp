import express, { Router } from 'express';

import { isLoggedIn, validateReviewFormData } from '../middlewares';
import { addReview, deleteReview } from '../controllers/reviewController';

const reviewRouter: Router = express.Router({ mergeParams: true });

reviewRouter.post('/', isLoggedIn, validateReviewFormData, addReview);

reviewRouter.delete('/:review_id', isLoggedIn, deleteReview);

export default reviewRouter;

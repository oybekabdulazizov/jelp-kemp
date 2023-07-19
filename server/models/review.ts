import { model, Schema, Types } from 'mongoose';

interface IReview {
  rating: number;
  text: string;
  author: Types.ObjectId;
}

const ReviewSchema = new Schema<IReview>({
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating cannot be below 1.'],
    max: [5, 'Rating cannot exceed 5.'],
  },
  text: {
    type: String,
    required: true,
    maxLength: [1000, 'Review cannot exceed 1000 characters'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Review = model<IReview>('Review', ReviewSchema);

export default Review;

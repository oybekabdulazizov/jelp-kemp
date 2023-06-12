import { model, Schema } from 'mongoose';

import Review from './review';

interface ICampground {
  title: string;
  description: string;
  price: number;
  location: string;
  image?: string;
  reviews: Array<Object>;
}

const CampgroundSchema = new Schema<ICampground>({
  title: {
    type: String,
    required: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: true,
    maxLength: [1000, 'Description cannot exceed 1000 characters'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be lower than 0'],
    max: [1000, 'Price cannot be higher than 1000'],
  },
  location: {
    type: String,
    required: true,
    maxLength: [100, 'Location cannot exceed 250 characters'],
  },
  image: {
    type: String,
    maxLength: [250, 'Image Url length cannot exceed 250 characters'],
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

CampgroundSchema.post('findOneAndDelete', async function (campground) {
  if (campground) {
    await Review.deleteMany({
      _id: {
        $in: campground.reviews,
      },
    });
  }
});

const Campground = model<ICampground>('Campground', CampgroundSchema);

export default Campground;

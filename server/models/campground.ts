import { model, Schema } from 'mongoose';

interface ICampground {
  title: string;
  description: string;
  price: number;
  location: string;
  imgUrl?: string;
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
  imgUrl: { type: String, required: false },
});

const Campground = model<ICampground>('Campground', CampgroundSchema);

export default Campground;

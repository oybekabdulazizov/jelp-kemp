import { model, Schema } from 'mongoose';

interface ICampground {
  title: string;
  price: string;
  description: string;
  location: string;
}

const CampgroundSchema = new Schema<ICampground>({
  title: String,
  price: String,
  description: String,
  location: String,
});

const Campground = model<ICampground>('Campground', CampgroundSchema);

export default Campground;

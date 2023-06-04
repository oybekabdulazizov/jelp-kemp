type Campground_Type = {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image?: string;
};

type Dimentions_Type = {
  width: number;
  height: number;
};

export type { Campground_Type, Dimentions_Type };

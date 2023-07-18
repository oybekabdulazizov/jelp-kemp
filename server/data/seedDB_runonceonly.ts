import { connect } from 'mongoose';
import axios from 'axios';

import Campground from '../models/campground';
import cities from './cities.json';
import descriptors from './descriptors.json';
import places from './places.json';
import Review from '../models/review';

connect('mongodb://127.0.0.1:27017/jelp-kemp')
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.log('ERROR OCCURRED WHILE CONNECTING TO THE DATABASE:');
    console.log(err);
  });

const getRandomItem = (arr: string[]): string =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomPrice = (): number => {
  return Math.floor(Math.random() * (40 - 20) + 20);
};

const getImage = async (title: string): Promise<string> => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${title}&client_id=7pj-OlBlzzw1ZTtPE7n5QMRHPXdvLCntLGOl-7SAT0c`
    );
    const data = await response.data;

    return data.results[0].urls.regular;
  } catch (err) {
    return '';
  }
};

const seedDB = async (): Promise<void> => {
  await Review.deleteMany({});
  await Campground.deleteMany({});
  const citiesSliced = cities.slice(0, 100);

  for (let i = 0; i < 50; i++) {
    const rand: number = Math.floor(Math.random() * citiesSliced.length);

    const title: string = `${getRandomItem(descriptors)} ${getRandomItem(
      places
    )}`;
    const description: string =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies, nunc eu hendrerit volutpat, quam neque accumsan tellus, vel molestie arcu purus non velit. Mauris sagittis non nibh et laoreet. Sed viverra orci ipsum, quis lobortis dui eleifend at. Quisque quis felis elit. Donec ut convallis orci, ac egestas ipsum. Suspendisse viverra nulla in erat rutrum hendrerit. Donec facilisis massa et tincidunt maximus. Ut sit amet augue ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam malesuada volutpat ligula, vel tincidunt neque scelerisque varius. Sed lorem tortor, dignissim non arcu eu, convallis luctus metus. Quisque nec dignissim leo, quis condimentum felis. Donec ut eros lectus. Nullam at mi suscipit, sodales justo eget, tempus arcu. Etiam hendrerit est ac diam elementum tristique.';
    const price: number = getRandomPrice();
    const location: string = `${citiesSliced[rand].city}, ${citiesSliced[rand].state}`;
    const image = await getImage(title);
    const author = '6494c3061a0d0ffca2fb4f52';

    const campground = new Campground({
      title,
      description,
      price,
      location,
      image,
      author,
    });
    campground.save();
  }
};

seedDB();

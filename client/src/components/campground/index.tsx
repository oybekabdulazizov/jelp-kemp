import { Campground_Type } from '../../shared/types';
import Campground from './Campground';

type Props = {
  campgroundsData: Array<Campground_Type>;
};

export default function Campgrounds({ campgroundsData }: Props) {
  return (
    <div className='container'>
      <ul>
        {campgroundsData.map((campground) => (
          <Campground {...campground} key={campground._id} />
        ))}
      </ul>
    </div>
  );
}

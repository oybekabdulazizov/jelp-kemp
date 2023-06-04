import { Campground_Type } from '../../shared/types';
import Campground from './Campground';

type Props = {
  campgroundsData: Array<Campground_Type>;
};

export default function Campgrounds({ campgroundsData }: Props) {
  return (
    <div className='container mt-4'>
      <h2 className='w-75 mx-auto mb-3'>All Campgrounds</h2>
      {campgroundsData.map((campground) => (
        <Campground {...campground} key={campground._id} />
      ))}
    </div>
  );
}

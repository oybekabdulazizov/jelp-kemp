import { Campground_Type } from '../../shared/types';

type Props = {
  campgroundsData: Array<Campground_Type>;
};

export default function Campgrounds({ campgroundsData }: Props) {
  return (
    <div>
      <ul>
        {campgroundsData.map((camp, id) => (
          <li key={id}>
            {camp.title} ({camp.location}) - ${camp.price}/night
          </li>
        ))}
      </ul>
    </div>
  );
}

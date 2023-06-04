import { useEffect, useState } from 'react';

import { Dimentions_Type } from '../shared/types';

export default function useResize(): Dimentions_Type {
  const [dimentions, setDimentions] = useState<Dimentions_Type>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimentions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimentions;
}

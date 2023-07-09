import { ReactNode, createContext, useEffect, useState } from 'react';
import axios from 'axios';

import { UserContext_Type, User_Type_forContextState } from '../shared/types';

export const UserContext = createContext<UserContext_Type | {}>({});

type Props = {
  children: ReactNode;
};

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<User_Type_forContextState | {}>({});

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const data = await axios.get('http://localhost:3001/user');
        console.log(data);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

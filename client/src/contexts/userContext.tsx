import { ReactNode, createContext, useEffect, useState } from 'react';
import axios from 'axios';

import { UserContext_Type, User_Type_forContextState } from '../shared/types';

export const UserContext = createContext<UserContext_Type | {}>({});

type Props = {
  children: ReactNode;
};

export const saveUserToLocalStorate = async (
  data: User_Type_forContextState
) => {
  const token = JSON.stringify(data);
  localStorage.clear();
  localStorage.setItem('user', token);
  // const pathTo: string = (location.state?.path as string) || '/';
};

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<User_Type_forContextState | {}>({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    // const fetchUser = async (): Promise<void> => {
    //   if (!user) {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //       setUser(token);
    //     } else {
    //       const response = await axios.get('http://localhost:3001/user');
    //       if (response.data) {
    //         await saveToLocalStorate(response.data);
    //       }
    //     }
    //   }
    // };
    // fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

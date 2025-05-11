'use client';

import {useState} from 'react';

import {IUserData} from '../types/IUserData';
import {createContext, Dispatch, SetStateAction, useContext} from 'react';

export const UserContext = createContext<IUserData | null>(null);
export const UserDispatchContext = createContext<
  Dispatch<SetStateAction<IUserData | null>>
>(() => {});

export const useUserContext = () => useContext(UserContext);
export const useUserDispatchContext = () => useContext(UserDispatchContext);

export function UserContextProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<IUserData | null>(null);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

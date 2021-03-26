import { createContext, useContext } from 'react';
import useAuthListener from '../hooks/use-auth-listener';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

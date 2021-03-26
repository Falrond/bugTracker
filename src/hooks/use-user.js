import { useState, useEffect } from 'react';
import { useUserContext } from '../context/user';
import { getUserByUserId } from '../services/firebase';

const useUser = () => {
  const { user } = useUserContext();
  const [activeUser, setActiveUser] = useState({});

  const getUserObjByUserId = async () => {
    const response = await getUserByUserId(user.uid);
    setActiveUser(response);
  };

  useEffect(() => {
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);
  return { user: activeUser };
};

export default useUser;

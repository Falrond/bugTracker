import { useState, useEffect, useContext } from 'react';
import { useFirebaseContext } from '../context/firebase';

const useAuthListener = () => {
  const { firebase } = useFirebaseContext();
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('authUser')));
  }, [firebase]);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(authUser => {
      // if user is true, store the user in localstorage
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });
    return () => {
      listener();
    };
  }, [firebase]);

  return { user };
};

export default useAuthListener;

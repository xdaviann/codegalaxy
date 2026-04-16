// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserData, getUserProgress } from '../firebase/firestore';
import { logout as firebaseLogout } from '../firebase/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const [data, prog] = await Promise.all([
            getUserData(firebaseUser.uid),
            getUserProgress(firebaseUser.uid),
          ]);
          setUserData(data);
          setProgress(prog || {});
        } catch (err) {
          console.error('Error loading user data:', err);
        }
      } else {
        setUser(null);
        setUserData(null);
        setProgress({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUserData = async () => {
    if (!user) return;
    const [data, prog] = await Promise.all([
      getUserData(user.uid),
      getUserProgress(user.uid),
    ]);
    setUserData(data);
    setProgress(prog || {});
  };

  const logout = async () => {
    await firebaseLogout();
  };

  return (
    <AuthContext.Provider value={{ user, userData, progress, loading, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

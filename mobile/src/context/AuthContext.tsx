import {onAuthStateChanged} from 'firebase/auth';
import {useContext, createContext, SetStateAction} from 'react';
import React, {useState, Dispatch, ReactNode, useEffect} from 'react';
import {authentication} from '../firebase';

type AuthContextValues = {
  userId: string;
  credential: CredentialType | null;
  setUserId: Dispatch<SetStateAction<string>>;
  setCredential: Dispatch<SetStateAction<CredentialType | any>>;
};

const AuthContext = createContext({} as AuthContextValues);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [userId, setUserId] = useState<string>('');
  const [credential, setCredential] = useState<CredentialType | any>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user: any) => {
      setCredential(user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{userId, credential, setUserId, setCredential}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

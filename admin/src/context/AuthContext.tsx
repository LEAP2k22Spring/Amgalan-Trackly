import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { useState, Dispatch, ReactNode, useEffect } from "react";
import { useContext, createContext, SetStateAction } from "react";
import { UserCredential, User, onAuthStateChanged } from "firebase/auth";

type AuthContextvalues = {
  credential: User | null;
  logout: () => Promise<void>;
  setCredential: Dispatch<SetStateAction<User | null>>;
  signin: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
};

const AuthContext = createContext({} as AuthContextvalues);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { logout, signin, signup } = useAuth(auth);
  const [credential, setCredential] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCredential(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ logout, signin, signup, setCredential, credential }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

import {
  Auth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const useAuth = (auth: Auth) => {
  const logout = () => signOut(auth);

  const signin = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  return { signin, signup, logout };
};

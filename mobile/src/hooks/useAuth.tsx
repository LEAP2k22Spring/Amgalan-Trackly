import {update, ref} from 'firebase/database';
import {authentication, realtimeDatabase} from '../firebase';
import {signOut, signInWithEmailAndPassword} from 'firebase/auth';

export const useAuth = () => {
  const signout = () => {
    signOut(authentication);
  };
  const getUser = (userId: string) => {
    return ref(realtimeDatabase, 'drivers/' + userId);
  };
  const signin = (email: string, password: string) => {
    return signInWithEmailAndPassword(authentication, email, password);
  };
  const updateStatus = (userId: string, status: boolean) => {
    update(ref(realtimeDatabase, 'drivers/' + userId), {loggedIn: status});
  };
  return {signin, getUser, signout, updateStatus};
};

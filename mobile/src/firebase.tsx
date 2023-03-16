import {firebaseConfig} from './key';
import {getAuth} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const application = initializeApp(firebaseConfig);

export const authentication = getAuth(application);
export const realtimeDatabase = getDatabase(application);

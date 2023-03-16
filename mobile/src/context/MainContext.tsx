import {useAuthContext} from './AuthContext';
import {realtimeDatabase} from '../firebase';
import {set, ref, update} from 'firebase/database';
import Geolocation from 'react-native-geolocation-service';
import {useContext, createContext, SetStateAction} from 'react';
import React, {useState, Dispatch, ReactNode, useEffect} from 'react';
import {request, PERMISSIONS, PermissionStatus} from 'react-native-permissions';

type MainContextValues = {
  sharePosition: boolean;
  userPosition: Coordinates;
  updatePosition: (userId: string) => void;
  setSharePosition: Dispatch<SetStateAction<boolean>>;
  setUserPosition: Dispatch<SetStateAction<Coordinates>>;
};

const MainContext = createContext({} as MainContextValues);

export const MainProvider = ({children}: {children: ReactNode}) => {
  const {credential, userId: currentId} = useAuthContext();
  const [userPosition, setUserPosition] = useState<Coordinates>({
    latitude: 47.880848,
    longitude: 106.85904,
  });
  const [sharePosition, setSharePosition] = useState<boolean>(false);

  /* Set location when user clicks share position button. */
  const updatePosition = (userId: string) => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((res: PermissionStatus) => {
      if (res === 'granted') {
        Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
          set(ref(realtimeDatabase, 'driversPosition/' + userId), {
            email: credential?.email,
            fullname: credential?.firstname,
            location: {latitude, longitude},
            phonenumber: credential?.phonenumber,
          });
        });
        setSharePosition(true);
      }
    });
  };

  /* Update user's position */
  useEffect(() => {
    if (sharePosition) {
      Geolocation.watchPosition(({coords: {latitude, longitude}}) => {
        update(ref(realtimeDatabase, 'driversPosition/' + currentId), {
          location: {latitude, longitude},
        });
      });
    }
  }, [sharePosition]);

  /* Get location when user logged in. */
  useEffect(() => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((res: PermissionStatus) => {
      if (res === 'granted') {
        Geolocation.getCurrentPosition(
          ({coords: {longitude, latitude}}) => {
            setUserPosition({latitude, longitude});
          },
          err => {
            console.log(err.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  }, []);

  return (
    <MainContext.Provider
      value={{
        userPosition,
        sharePosition,
        updatePosition,
        setUserPosition,
        setSharePosition,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);

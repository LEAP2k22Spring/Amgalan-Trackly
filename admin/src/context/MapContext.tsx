import { database } from "../firebase";
import { ref, DataSnapshot } from "firebase/database";
import { useState, useEffect, ReactNode } from "react";
import { onChildAdded, onChildChanged } from "firebase/database";
import { useContext, createContext, Dispatch, SetStateAction } from "react";

type MapContextValues = {
  choseDriversPos: Coordinates;
  activeDriversPos: DataSnapshot[];
  setChosenDriversPos: Dispatch<SetStateAction<Coordinates>>;
};

const MapContext = createContext({} as MapContextValues);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [choseDriversPos, setChosenDriversPos] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [activeDriversPos, setActiveDriversPos] = useState<DataSnapshot[]>([]);

  useEffect(() => {
    const drivers = ref(database, "driversPosition/");
    onChildAdded(drivers, (snapShot) => {
      const driver = snapShot.val();
      if (driver.loggedIn) {
        setActiveDriversPos((pre: DataSnapshot[]) => {
          return [...pre, driver];
        });
      }
    });
  }, []);

  useEffect(() => {
    const drivers = ref(database, "driversPosition/");
    onChildChanged(drivers, (snapShot) => {
      const driver = snapShot.val();
      if (driver.loggedIn) {
        setActiveDriversPos((pre: any) => {
          return [
            ...pre.filter((el: any) => el.email !== driver.email),
            driver,
          ];
        });
      } else {
        setActiveDriversPos((pre: any) => {
          return pre.filter((el: any) => el.email !== driver.email);
        });
      }
    });
  }, []);

  return (
    <MapContext.Provider
      value={{ activeDriversPos, choseDriversPos, setChosenDriversPos }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);

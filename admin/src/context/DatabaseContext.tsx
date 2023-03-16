import { database } from "../firebase";
import { useContext, createContext } from "react";
import { useState, useEffect, ReactNode } from "react";
import { ref, set, DataSnapshot } from "firebase/database";
import { onChildAdded, onChildChanged } from "firebase/database";

type DataContextValues = {
  createNewDriver: (
    userData: EmployArg,
    userId: string,
    imgUrl: string
  ) => Promise<void>;
  activeDrivers: DataSnapshot[];
  inactiveDrivers: DataSnapshot[];
};

const DataContext = createContext({} as DataContextValues);

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
  const [activeDrivers, setActiveDrivers] = useState<DataSnapshot[]>([]);
  const [inactiveDrivers, setInactiveDrivers] = useState<DataSnapshot[]>([]);

  const createNewDriver = async (
    userData: EmployArg,
    userId: string,
    imgUrl: string
  ) => {
    return await set(ref(database, "drivers/" + userId), {
      ...userData,
      role: "driver",
      avatar: imgUrl,
      loggedIn: false,
    });
  };

  useEffect(() => {
    const drivers = ref(database, "drivers/");
    onChildAdded(drivers, (snapshot) => {
      const driver = snapshot.val();
      if (!driver.loggedIn) {
        setInactiveDrivers((pre: DataSnapshot[]) => {
          return [...pre, driver];
        });
      } else {
        setActiveDrivers((pre: DataSnapshot[]) => {
          return [...pre, driver];
        });
      }
    });
  }, []);

  useEffect(() => {
    const newDriver = ref(database, "drivers/");
    onChildChanged(newDriver, (data) => {
      const driver = data.val();
      if (!driver.loggedIn) {
        setInactiveDrivers((pre: DataSnapshot[]) => {
          return [...pre, driver];
        });
        setActiveDrivers((pre: DataSnapshot[]) => {
          return pre.filter((el: any) => el.email !== driver.email);
        });
      } else {
        setActiveDrivers((pre: DataSnapshot[]) => {
          return [...pre, driver];
        });
        setInactiveDrivers((pre: DataSnapshot[]) => {
          return pre.filter((el: any) => el.email !== driver.email);
        });
      }
    });
  }, []);

  return (
    <DataContext.Provider
      value={{ createNewDriver, activeDrivers, inactiveDrivers }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDatabaseContext = () => useContext(DataContext);

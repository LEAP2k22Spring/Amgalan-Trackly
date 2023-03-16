import {
  getDownloadURL,
  ref as storeRef,
  uploadBytesResumable,
} from "firebase/storage";
import { useState, ReactNode } from "react";
import { firestore, storage } from "../firebase";
import { useEffect, useContext, createContext } from "react";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

type MainContextValue = {
  createNewDriverToFirestore: any;
  admins: QueryDocumentSnapshot<DocumentData>[];
  uploadDriverImg: (imageFile: File) => Promise<string>;
};

const MainContext = createContext({} as MainContextValue);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [admins, setAdmins] = useState<QueryDocumentSnapshot<DocumentData>[]>(
    []
  );

  const uploadDriverImg = async (imageFile: File) => {
    const storageRef = storeRef(storage, `images/${imageFile.name}`);
    const uploadImg = uploadBytesResumable(storageRef, imageFile);
    await uploadImg;
    return await getDownloadURL(uploadImg.snapshot.ref);
  };

  const createNewDriverToFirestore = async (
    userData: EmployArg,
    userId: string,
    imgUrl: string
  ) => {
    await setDoc(doc(firestore, "drivers/", userId), {
      ...userData,
      role: "driver",
      avatar: imgUrl,
    });
  };

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(firestore, "admin"));
      querySnapshot.forEach((doc) => {
        setAdmins((pre: any) => [...pre, doc.data()]);
      });
    })();
  }, []);

  return (
    <MainContext.Provider
      value={{
        admins,
        uploadDriverImg,
        createNewDriverToFirestore,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);

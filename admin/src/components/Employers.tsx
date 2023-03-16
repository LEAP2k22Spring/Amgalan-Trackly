import { useState } from "react";
import { useMapContext } from "../context";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CreateEmployForm } from "./CreateEmployForm";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlinePlus, AiOutlineMail } from "react-icons/ai";
import { useDatabaseContext } from "../context/DatabaseContext";

export const Employers = () => {
  const { inactiveDrivers, activeDrivers } = useDatabaseContext();
  const [createEmploy, setCreateEmploy] = useState<boolean>(false);
  const { activeDriversPos, setChosenDriversPos } = useMapContext();
  const usersStatus = [
    { name: "Идэвхтэй", drivers: activeDrivers },
    { name: "Идэвхгүй", drivers: inactiveDrivers },
  ];
  const showDriversPosition = (driversEmail: string) => {
    const driver: any = activeDriversPos.filter(
      (el: any) => el.email === driversEmail
    )[0];
    setChosenDriversPos(driver.location);
  };

  return (
    <>
      <motion.div
        initial={{ x: "-100%", zIndex: -10 }}
        animate={{
          x: 240,
          zIndex: 1500,
          transition: { duration: 0.8, type: "spring" },
        }}
        className="fixed w-96 h-screen py-9 px-7 overflow-y-auto bg-gray-200"
      >
        <button
          onClick={() => setCreateEmploy(true)}
          className="fleItemCenterBetween w-full bg-white px-5 py-3 rounded-md duration-200 hover:shadow-lg"
        >
          <span className="font-medium">Жолооч бүртгэх</span>
          <span className="perfectCenter rounded-md w-9 h-9 bg-gray-200">
            <AiOutlinePlus />
          </span>
        </button>
        {usersStatus.map(({ drivers, name }, id) => (
          <div key={id}>
            <div className="flexItemCenter gap-x-2 mt-12">
              {id === 0 && <span className="p-1 bg-green-400 rounded-full" />}
              <h3 style={{ color: id === 0 ? "#4ade80" : "#9ca3af" }}>
                {name}
              </h3>
            </div>
            <div className="mt-4 space-y-2 overflow-y-auto">
              {drivers.map((el: any, i) => (
                <div
                  key={i}
                  onClick={() => id === 0 && showDriversPosition(el.email)}
                  className="flexItemCenter gap-x-3 p-3 bg-white rounded-lg duration-200 cursor-pointer hover:bg-gray-300"
                >
                  <div className="w-20 h-20 overflow-hidden rounded-lg">
                    <img
                      src={el.avatar}
                      alt="user avatar"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3>
                      {el.firstname} {el.lastname}
                    </h3>
                    <div className="flexItemCenter gap-x-2 mb-1 mt-3 text-xs text-gray-500">
                      <AiOutlineMail size={16} />
                      <h3>{el.email}</h3>
                    </div>
                    <div className="flexItemCenter gap-x-2 text-xs text-gray-500">
                      <BsFillTelephoneFill size={16} />
                      <h3>{el.phonenumber}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
      <AnimatePresence>
        {createEmploy && <CreateEmployForm setCreateEmploy={setCreateEmploy} />}
      </AnimatePresence>
    </>
  );
};

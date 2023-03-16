import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { sibeBarOptions } from "../utils/constant";
import { Employers, MapSection } from "../components";
import { useAuthContext } from "../context/AuthContext";

export const Processing = () => {
  const { logout } = useAuthContext();
  const [current, setCurrent] = useState<number>(0);
  const [openEmployers, setOpenEmployers] = useState<boolean>(false);

  return (
    <div className="flex fullScreen">
      <div className="fleItemCenterBetween flex-col py-16 w-60 bg-defaultBlack text-gray-400">
        <div className="w-full">
          <h3 className="text-white text-center font-semibold mb-28">
            Бүтээгдэхүүний нэр
          </h3>
          <div className="w-full space-y-3 px-2">
            {sibeBarOptions.map(({ Icon, name }, id) => (
              <button
                key={id}
                onClick={() => {
                  setCurrent(id);
                  id === 1 && setOpenEmployers(true);
                  id === 0 && setOpenEmployers(false);
                }}
                className="relative perfectCenter w-full h-9 group"
              >
                <div className="sidebarButton">
                  <Icon size={22} />
                  <span>{name}</span>
                </div>
                <span
                  style={{ display: current === id ? "block" : "none" }}
                  className="absolute inset-y-0 left-0 w-1 bg-white rounded-r-md"
                />
              </button>
            ))}
          </div>
        </div>
        <button onClick={logout} className="sidebarButton">
          <BiLogOut size={22} />
          <span>Гарах</span>
        </button>
      </div>
      {openEmployers && <Employers />}
      <MapSection />
    </div>
  );
};

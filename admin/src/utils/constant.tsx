import { IconType } from "react-icons";
import { BsBook } from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi";

type SidebarOptionType = {
  name: string;
  Icon: IconType;
};

export const createEmploy: InputType[] = [
  { name: "lastname", placeholder: "Овог", type: "text" },
  { name: "firstname", placeholder: "Нэр", type: "text" },
  { name: "phonenumber", placeholder: "Утасны дугаар", type: "text" },
  { name: "email", placeholder: "И-мэйл", type: "text" },
];
export const loginElements: InputType[] = [
  { name: "email", placeholder: "И-мэйл", type: "text" },
  { name: "password", placeholder: "Нууц үг", type: "password" },
];
export const sibeBarOptions: SidebarOptionType[] = [
  {
    name: "Явц харах",
    Icon: BsBook,
  },
  {
    name: "Ажилчид",
    Icon: HiOutlineIdentification,
  },
];

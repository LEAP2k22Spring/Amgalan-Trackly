import {
  Dispatch,
  useState,
  FormEvent,
  ChangeEvent,
  SetStateAction,
} from "react";
import { motion } from "framer-motion";
import { FirebaseError } from "firebase/app";
import { createEmploy } from "../utils/constant";
import { useMainContext } from "../context/MainContext";
import { useAuthContext } from "../context/AuthContext";
import { useDatabaseContext } from "../context/DatabaseContext";

type CreateEmployProps = {
  setCreateEmploy: Dispatch<SetStateAction<boolean>>;
};

export const CreateEmployForm = ({ setCreateEmploy }: CreateEmployProps) => {
  const { signup } = useAuthContext();
  const { createNewDriver } = useDatabaseContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const { uploadDriverImg, createNewDriverToFirestore } = useMainContext();

  const [employerData, setEmployerData] = useState<EmployArg>({
    email: "",
    lastname: "",
    firstname: "",
    phonenumber: "",
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployerData({ ...employerData, [name]: value });
  };

  const handleSelectFile = (files: any) => {
    setUploadImg(files[0]);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        !employerData.email ||
        !employerData.lastname ||
        !employerData.firstname ||
        !employerData.phonenumber
      )
        return alert("Жолоочийн мэдээллийг оруулна уу?");
      if (!uploadImg) return alert("Зураг сонгоно уу!");
      setLoading(true);
      const user = await signup(employerData.email, employerData.phonenumber);
      if (user.user.uid) {
        const imgUrl = await uploadDriverImg(uploadImg);
        await createNewDriver(employerData, user.user.uid, imgUrl);
        await createNewDriverToFirestore(employerData, user.user.uid, imgUrl);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          alert("Жолооч бүртгэгдсэн байна.");
        }
      }
    }
    setLoading(false);
    setEmployerData({
      email: "",
      lastname: "",
      firstname: "",
      phonenumber: "",
    });
    setCreateEmploy(false);
  };
  return (
    <>
      <div
        onClick={() => setCreateEmploy(false)}
        className="fixed inset-0 bg-black/40 z-[1600]"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1600]">
        <motion.div
          exit={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.7 }}
        >
          <div
            className={`relative flexItemCenter gap-x-7 py-8 ${
              uploadImg ? "px-6" : "px-12"
            } ${
              uploadImg ? "w-[900px]" : "w-[450px]"
            } bg-white duration-300 overflow-hidden rounded-2xl`}
          >
            <div className="flex-1">
              <h3 className="text-2xl mb-3 font-semibold">Жолооч бүртгэх</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                {createEmploy.map(({ name, placeholder, type }, id) => (
                  <input
                    key={id}
                    type={type}
                    name={name}
                    onChange={handleChanges}
                    placeholder={placeholder}
                    className="border border-gray-300 py-3 px-5 rounded-md"
                  />
                ))}
                <label
                  htmlFor="selectImage"
                  className="createEmployBtn text-center cursor-pointer duration-200 hover:bg-gray-100"
                >
                  <span>Зураг сонгох</span>
                  <input
                    hidden
                    type={"file"}
                    accept="image/*"
                    id="selectImage"
                    onChange={(e) => handleSelectFile(e.target.files)}
                  />
                </label>
                <div className="flex gap-x-2">
                  <button
                    type="submit"
                    className="createEmployBtn bg-black text-white"
                  >
                    Хадгалах
                  </button>
                  <button
                    type="button"
                    className="createEmployBtn"
                    onClick={() => setCreateEmploy(false)}
                  >
                    Хаах
                  </button>
                </div>
              </form>
            </div>
            {uploadImg && (
              <div className="flex-1 h-[420px] rounded-md overflow-hidden">
                <img
                  alt="selected"
                  className="object-cover w-full h-full"
                  src={uploadImg === null ? "" : URL.createObjectURL(uploadImg)}
                />
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 perfectCenter bg-black/40 z-[2000]">
                <h3 className="text-white text-3xl">Loading ...</h3>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

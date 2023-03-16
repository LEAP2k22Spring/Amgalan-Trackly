import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { loginElements } from "../utils/constant";
import { useAuthContext } from "../context/AuthContext";
import { useMainContext } from "../context/MainContext";
import { useState, ChangeEvent, FormEvent } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const { admins } = useMainContext();
  const { signin, setCredential } = useAuthContext();
  const [userData, setUserData] = useState<LoginArgs>({
    email: "",
    password: "",
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.email === "" || userData.password === "")
      return alert("Имэйл хаяг эсвэл нууц үгээ оруулна уу");
    const validAdmin = admins.filter(
      (user: any) => user.email === userData.email
    );
    if (validAdmin.length === 0) return alert("Бүртгэлгүй админ байна.");
    try {
      await signin(userData.email, userData.password).then((userCredential) => {
        setCredential(userCredential.user);
      });
      navigate("/process");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/wrong-password") {
          alert("Нууц үг буруу байна.");
        }
      }
    }
  };

  return (
    <div className="flex fullScreen">
      <div className="flex-1 perfectCenter w-full h-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-96 max-w-full mx-5 md:mx-10"
        >
          <h3 className="text-2xl font-medium mb-10">Тавтай морил !</h3>
          {loginElements.map(({ name, placeholder, type }, id) => (
            <input
              key={id}
              type={type}
              name={name}
              onChange={handleChanges}
              placeholder={placeholder}
              className="w-full max-w-full mb-5 py-3 pl-5 border border-gray-300 rounded-md"
            />
          ))}
          <button
            type="submit"
            className="bg-defaultBlack py-3 text-white rounded-md active:bg-black/70"
          >
            Нэвтрэх
          </button>
        </form>
      </div>
      <div className="flex-1 hidden md:block bg-defaultBlack">
        <img
          alt="login back"
          src={require("../assets/login.png")}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
  const { credential } = useAuthContext();
  return credential ? <Outlet /> : <Navigate to="/" />;
};

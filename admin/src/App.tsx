import { useEffect } from "react";
import { Login, Processing } from "./pages";
import { PrivateRoute } from "./routes/PrivateRoute";
import { useAuthContext } from "./context/AuthContext";
import { Route, Routes, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const { credential } = useAuthContext();

  useEffect(() => {
    credential && navigate("/process");
    // eslint-disable-next-line
  }, [credential]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/process" element={<Processing />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

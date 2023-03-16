import "./styles.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MapProvider, AuthProvider } from "./context";
import { DatabaseProvider, MainProvider } from "./context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
    <MapProvider>
      <DatabaseProvider>
        <MainProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MainProvider>
      </DatabaseProvider>
    </MapProvider>
  </AuthProvider>
);

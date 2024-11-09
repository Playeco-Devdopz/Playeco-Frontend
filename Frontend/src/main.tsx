import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserContext.js";
import { ApiContextProvider } from "./context/ApiContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthContextProvider>
        <ApiContextProvider>
          <App />
        </ApiContextProvider> 
      </UserAuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

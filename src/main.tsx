import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { AppRoot } from "./Root";
import { AuthContextProvider } from "./Providers/Auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppRoot />
    </AuthContextProvider>
  </React.StrictMode>
);

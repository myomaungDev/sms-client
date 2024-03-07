import React from "react";
import { AuthContextProvider } from "./Providers/Auth";

export const AppRoot: React.FC = () => {
  return (
    <React.Fragment>
      <AuthContextProvider>
        <React.Fragment></React.Fragment>
      </AuthContextProvider>
    </React.Fragment>
  );
};

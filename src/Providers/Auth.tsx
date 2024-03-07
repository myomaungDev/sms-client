import React, { createContext, useContext, useState } from "react";
import { userProps } from "../Interfaces";

type AuthContextType = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user?: userProps;
  setUser: React.Dispatch<React.SetStateAction<userProps | undefined>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use Context must be within Auth Context Provider");
  } else {
    return context;
  }
};

interface props {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<props> = ({ children }) => {
  const [isAuth, setisAuth] = useState(true);
  const [user, setuser] = useState<userProps>();
  const [accessToken, setaccessToken] = useState("");
  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          isAuth: isAuth,
          setIsAuth: setisAuth,
          accessToken: accessToken,
          setAccessToken: setaccessToken,
          user: user,
          setUser: setuser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </React.Fragment>
  );
};

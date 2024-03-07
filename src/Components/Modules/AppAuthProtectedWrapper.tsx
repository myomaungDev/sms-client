import React from "react";
import { useAuthContext } from "../../Providers/Auth";
import { Navigate } from "react-router-dom";
interface props {
  children: React.ReactNode;
}
export const AppAuthProtectedWrapper: React.FC<props> = ({ children }) => {
  const { isAuth } = useAuthContext();
  if (!isAuth) return <Navigate to={`/`} />;
  return <React.Fragment>{children}</React.Fragment>;
};

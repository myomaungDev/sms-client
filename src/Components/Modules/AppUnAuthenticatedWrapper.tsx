import React from "react";
import { useAuthContext } from "../../Providers/Auth";
import { Navigate } from "react-router-dom";
interface props {
  children: React.ReactNode;
}
export const AppUnAuthProtectedWrapper: React.FC<props> = ({ children }) => {
  const { isAuth } = useAuthContext();
  console.log('work')
  if (isAuth) return <Navigate to={`/dashboard`} />;
  return <React.Fragment>{children}</React.Fragment>;
};

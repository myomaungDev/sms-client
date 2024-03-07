import React, { useCallback, useEffect } from "react";
import { AppRouter } from "./Screens";
import { RouterProvider } from "react-router-dom";
import { useAuthContext } from "./Providers/Auth";
import { API } from "./Services";
import { APIURLS } from "./Config";
import { AxiosError, AxiosResponse } from "axios";

export const AppRoot: React.FC = () => {
  const { accessToken, setIsAuth, setUser } = useAuthContext();

  const syncUser = useCallback(() => {
    if (accessToken) {
      API.get(`${APIURLS.users.profile}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res: AxiosResponse) => {
          const { user } = res.data;
          if (user) {
            setIsAuth(true);
            setUser(user);
          }
        })
        .catch((err: AxiosError) => {
          console.log(err);
        });
    } else {
      setIsAuth(false);
    }
  }, [accessToken, setIsAuth, setUser]);

  useEffect(() => {
    syncUser();
  }, [syncUser]);

  return (
    <React.Fragment>
      <React.Fragment>
        <RouterProvider router={AppRouter} />
      </React.Fragment>
    </React.Fragment>
  );
};

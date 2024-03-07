import React, { useState } from "react";
import { PageWrapper } from "../Components/Modules/PageWrapper";
import { Controller, useForm } from "react-hook-form";
import { API } from "../Services";
import { APIURLS } from "../Config";
import { AxiosError, AxiosResponse } from "axios";
import { AppUnAuthProtectedWrapper } from "../Components/Modules/AppUnAuthenticatedWrapper";
import { useAuthContext } from "../Providers/Auth";

export const AppSignupScreen: React.FC = () => {
  const { setIsAuth, setAccessToken } = useAuthContext();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const SubmitForm = (data: any) => {
    try {
      API.post(`${APIURLS.users.signup}`, data)
        .then((res: AxiosResponse) => {
          if (
            res.data &&
            res.data.status &&
            res.data.status === 200 &&
            res.data.accessToken
          ) {
            setAccessToken(res.data.accessToken);
            setIsAuth(true);
          } else if (
            res.data &&
            res.data.status &&
            res.data.status === 400 &&
            res.data.errors
          ) {
            setErrorMessages(res.data.errors);
          }
        })
        .catch((err: AxiosError) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppUnAuthProtectedWrapper>
      <PageWrapper>
        <React.Fragment>
          <form
            onSubmit={handleSubmit(SubmitForm)}
            className="w-full flex flex-col min-h-screen justify-center items-center content-center"
          >
            <div className="w-full flex flex-col space-y-2 max-w-screen-sm mx-auto px-4 py-4 bg-white">
              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="username" className="text-sm text-slate-600">
                  {" "}
                  User Name
                </label>
                <Controller
                  control={control}
                  name="username"
                  rules={{
                    required: { value: true, message: `Don't leave it blank.` },
                  }}
                  render={({
                    formState: { errors },
                    field: { onBlur, onChange, ref, value },
                  }) => (
                    <React.Fragment>
                      <input
                        className="w-full form-input"
                        type="text"
                        ref={ref}
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.value)}
                      />
                      {errors && errors.username && errors.username.message ? (
                        <p className="text-xs text-red-600">
                          {errors.username.message}
                        </p>
                      ) : null}
                    </React.Fragment>
                  )}
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="username" className="text-sm text-slate-600">
                  {" "}
                  Email
                </label>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: { value: true, message: `Don't leave it blank.` },
                  }}
                  render={({
                    formState: { errors },
                    field: { onBlur, onChange, ref, value },
                  }) => (
                    <React.Fragment>
                      <input
                        className="w-full form-input"
                        type="text"
                        ref={ref}
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.value)}
                      />
                      {errors && errors.email && errors.email.message ? (
                        <p className="text-xs text-red-600">
                          {errors.email.message}
                        </p>
                      ) : null}
                    </React.Fragment>
                  )}
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="username" className="text-sm text-slate-600">
                  {" "}
                  Password
                </label>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: { value: true, message: `Don't leave it blank.` },
                  }}
                  render={({
                    formState: { errors },
                    field: { onBlur, onChange, ref, value },
                  }) => (
                    <React.Fragment>
                      <input
                        className="w-full form-input"
                        type="password"
                        ref={ref}
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.value)}
                      />
                      {errors && errors.password && errors.password.message ? (
                        <p className="text-xs text-red-600">
                          {errors.password.message}
                        </p>
                      ) : null}
                    </React.Fragment>
                  )}
                />
              </div>
              {errorMessages.map((message, i) => (
                <p key={i} className="text-xs text-red-600">
                  {message}
                </p>
              ))}
              <div className="w-full flex-col flex my-4">
                <button
                  type="submit"
                  className="w-full px-2 py-3 bg-red-600 hover:bg-red-900 text-white text-lg uppercase font-bold"
                >
                  Signup
                </button>
              </div>
            </div>
          </form>
        </React.Fragment>
      </PageWrapper>
    </AppUnAuthProtectedWrapper>
  );
};

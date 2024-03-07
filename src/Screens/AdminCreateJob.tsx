import React from "react";
import { AppAuthProtectedWrapper } from "../Components/Modules/AppAuthProtectedWrapper";
import { PageWrapper } from "../Components/Modules/PageWrapper";
import { Controller, useForm } from "react-hook-form";
import Papa from "papaparse";
import { API } from "../Services";
import { APIURLS } from "../Config";
import { useAuthContext } from "../Providers/Auth";
import { AxiosError, AxiosResponse } from "axios";
interface smsProps {
  phone_number: string;
  message: string;
}
interface createJobDto {
  title: string;
  started_at: string;
  smsData: smsProps[];
}
export const AppAdminCreateJobScreen: React.FC = () => {
  const { control, handleSubmit, setError, setValue, watch } =
    useForm<createJobDto>({
      mode: "onChange",
      defaultValues: {
        title: "",
        started_at: "",
        smsData: [],
      },
    });
  const ChangeHandlerImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const importCsv = e.target.files[0];
      Papa.parse(importCsv, {
        complete: (result: Papa.ParseResult<unknown>) => {
          if (result.data) {
            const rawData = result.data as smsProps[];
            const smsData = rawData.filter(
              (value) => value.phone_number && value.message
            );
          
            setValue("smsData", smsData);
          } else if (result.errors) {
            setError("smsData", {
              type: "pattern",
              message: "Please double check your csv.",
            });
          }
        },
        header: true,
      });
    }
  };
  const { accessToken } = useAuthContext();
  const SubmitForm = (data: any) => {
    try {
      API.post(`${APIURLS.jobs.create}`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res: AxiosResponse) => {
          if(res.data && res.data.status && res.data.status===200 && res.data.job && res.data.job.title){
            alert(`Job ${res.data.job.title} is created.`)
          }
          else{
            alert("Something wrong.")
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
    <AppAuthProtectedWrapper>
      <PageWrapper>
        <React.Fragment>
          <h4>Create SMS </h4>
          <form
            onSubmit={handleSubmit(SubmitForm)}
            className="w-full flex flex-col space-y-2"
          >
            <div className="w-full flex flex-col space-y-2 max-w-screen-md mx-auto">
              <label htmlFor="username" className="text-sm text-slate-600">
                Title
              </label>
              <Controller
                control={control}
                name="title"
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
                    {errors && errors.title && errors.title.message ? (
                      <p className="text-xs text-red-600">
                        {errors.title.message}
                      </p>
                    ) : null}
                  </React.Fragment>
                )}
              />
            </div>
            <div className="w-full flex flex-col space-y-2 max-w-screen-md mx-auto">
              <label htmlFor="username" className="text-sm text-slate-600">
                Started At
              </label>
              <Controller
                control={control}
                name="started_at"
                render={({
                  formState: { errors },
                  field: { onBlur, onChange, ref, value },
                }) => (
                  <React.Fragment>
                    <input
                      className="w-full form-input"
                      type="datetime-local"
                      ref={ref}
                      value={value}
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value)}
                    />
                    {errors &&
                    errors.started_at &&
                    errors.started_at.message ? (
                      <p className="text-xs text-red-600">
                        {errors.started_at.message}
                      </p>
                    ) : null}
                  </React.Fragment>
                )}
              />
            </div>
            <div className="w-full flex flex-col space-y-2 max-w-screen-md mx-auto">
              <label htmlFor="username" className="text-sm text-slate-600">
                SMS Import
              </label>
              <Controller
                control={control}
                name="smsData"
                render={({ field: { onBlur, ref }, formState: { errors } }) => (
                  <React.Fragment>
                    <input
                      className="w-full form-input"
                      type="file"
                      accept=".csv"
                      ref={ref}
                      onBlur={onBlur}
                      onChange={(e) => ChangeHandlerImport(e)}
                    />
                    {errors && errors.smsData && errors.smsData.message ? (
                      <p className="text-xs text-red-600">
                        {errors.smsData.message}
                      </p>
                    ) : null}
                  </React.Fragment>
                )}
              />
              <div className="w-full flex-col flex my-4">
                <button
                  type="submit"
                  className="w-full px-2 py-3 bg-red-600 hover:bg-red-900 text-white text-lg uppercase font-bold"
                >
                  {watch("started_at") ? "Scudule" : "Send Now"}
                </button>
              </div>
            </div>
          </form>
        </React.Fragment>
      </PageWrapper>
    </AppAuthProtectedWrapper>
  );
};

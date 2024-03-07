import axios from "axios";
import { APIURLS, AppConfig } from "../Config";

export const API = axios.create({
  baseURL: AppConfig.API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  document.body.classList.add("loader");
  return config;
});

API.interceptors.response.use(
  (response) => {
    document.body.classList.remove("loader");
    if (
      response.config.url?.includes(APIURLS.users.login) ||
      response.config.url?.includes(APIURLS.users.signup)
    ) {
      if (
        response.data &&
        response.data.status &&
        response.data.status === 200 &&
        response.data.accessToken
      ) {
        localStorage.setItem("_access_token", response.data.accessToken);
      }
    }
    return response;
  },
  (error) => {
    document.body.classList.remove("loader");
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        localStorage.removeItem("_access_token");

        console.log("Unauthorized error.");
      } else if (status === 400) {
        console.log("Bad Request error");
      }
    } else if (error.request) {
      console.log("No response received. Request:", error.request);
    } else {
      console.log("Error setting up the request:", error.message);
    }

    return Promise.reject(error);
  }
);

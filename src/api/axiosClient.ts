/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

import { store, authActions } from "@/redux";
import { LogApp } from "@/utils";
import { COFFICE_ACCESS_TOKEN } from "@/configs";
import { BaseResponseProps } from "../interfaces";
import queryString from "query-string";

// const queryString = require('query-string')

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const axiosClient = axios.create({
  baseURL: "http://localhost:8080" || process.env.REACT_APP_API_URL,

  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    charset: "UTF-8",
    "Access-Control-Allow-Origin": "*",
  },

  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config: any) => {
  const token = Cookies.get(COFFICE_ACCESS_TOKEN);
  config.headers["Authorization"] = `Bearer ${token}`;
  // config.headers["Accept-Encoding"] = `gzip, deflate, br`;
  // config.headers["x-csrf-token"] = token;

  if (config.url === "/media" && config.method === "post") {
    console.log('im here')
    config.headers["Content-Type"] = "multipart/form-data";
  }

  delete axios.defaults.headers.common["Accept-Encoding"];
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError<any, any>) => {
    if (error.response && error.response.status === 401) {
      //logout
      Cookies.remove(COFFICE_ACCESS_TOKEN);
      sessionStorage.clear();
      store.dispatch(authActions.logout());
      window.location.replace(PATH_LOGIN);
    }

    if (error.response) {
      LogApp("aewr", error.response.data);
      // Request made and server responded
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      LogApp(error.request);
      message.error({
        content: "Oops, something went wrong",
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      LogApp("Error", error.message);
    }
    throw error;
  }
);

export const ApiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig<any>) =>
    axiosClient.get<T, BaseResponseProps<T>>(url, config),
  post: <T, D = any>(url: string, payload?: D) =>
    axiosClient.post<T, BaseResponseProps<T>, D>(url, payload),
  put: <T, D = any>(url: string, payload?: D) =>
    axiosClient.put<T, BaseResponseProps<T>, D>(url, payload),
  delete: <T, D = any>(url: string, payload?: D) =>
    axiosClient.delete<T, BaseResponseProps<T>, D>(url, { data: payload }),
  patch: <T, D = any>(url: string, payload?: D) =>
    axiosClient.patch<T, BaseResponseProps<T>, D>(url, payload),
};

export default axiosClient;

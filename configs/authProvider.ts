// ** Axios
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// ** Auth Config
import authConfig from "./auth";

// ** Next
import Router from "next/router";

// ** Toast
import toast from "react-hot-toast";

// ** Cookies
import Cookies from "js-cookie";
import { GetServerSidePropsContext, PreviewData } from "next/types";
import { ParsedUrlQuery } from "querystring";

// ** Util Functions
import { getLoggerData, sendLoggerData } from "src/@core/utils/logger";

// Get token
const token = Cookies.get("token");

// Set Config
const config: AxiosRequestConfig = {
  baseURL: process.env.API_URL,
  headers: {
    Authorization: "Bearer " + token,
  },
};

// Change base url and return config
export const setBaseURL = (url: string): AxiosRequestConfig => {
  return { ...config, baseURL: url };
};

// Change token with server-side context request token cookie value
export const serverSideConfig = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): AxiosRequestConfig => {
  const token = context.req.cookies[authConfig.storageTokenKeyName];
  return {
    ...config,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

// Clear token and redirect
const clearUser = (message: string) => {
  Cookies.remove(authConfig.storageTokenKeyName);
  toast.error(message);
  Router.push("/");
};

// Create instance
const instance = axios.create(config);

// Request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Before sending axios request ...

    return config;
  },
  (error: AxiosError) => {
    // Before sending axios request if something went wrong ...

    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Get logger data

    /**
     * Uncomment below to send logger data
     * const loggerData = getLoggerData(response)
     * sendLoggerData(loggerData)
     */

    return response;
  },
  (error: AxiosError) => {
    /**
     * 455 status code means token ip and user ip doesn't match
     * if so remove token and redirect user
     */
    if (error.response?.status === 455 && typeof window !== "undefined") {
      clearUser(
        "You've entered from another device or your network has changed."
      );
    }

    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearUser("Token has expired.");
    }

    /**
     * Uncomment below to send logger data
     * const loggerData = getLoggerData(error.response!)
     * sendLoggerData(loggerData)
     */

    return Promise.reject(error);
  }
);

export default instance;

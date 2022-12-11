import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

const token = Cookies.get("token");
const instance = axios.create({
  baseURL: "http://localhost:81/api/",
  timeout: 1000,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // if (typeof window !== "undefined" && error.response?.status === 500) {
    //   window.location.href = "/login";
    // }

    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // if (typeof window !== "undefined" && error.response?.status === 500) {
    //   window.location.href = "/login";
    // }

    return Promise.reject(error);
  }
);

export default instance;

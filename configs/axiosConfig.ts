import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

const instance = axios.create({
  baseURL: "http://localhost:81/api/",
  timeout: 1000,
  headers: {
    authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzA1NzA4MzMsImxldmVsIjoxLCJ1c2VySWQiOjEsInVzZXJuYW1lIjoicHJveG9sYWIifQ.iSHbFFl9xSDtsHz_BdeolHx5zM2Bd1ANX1f8eMw7lS0cart",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config);
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
    // if (typeof window !== "undefined" && error.response?.status !== 200) {
    //   window.location.href = "/login";
    // }

    return Promise.reject(error);
  }
);

export default instance;

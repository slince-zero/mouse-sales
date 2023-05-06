import axios from "axios";
import { toast } from "~/composables/util";
import { getToken } from "~/composables/auth";

const service = axios.create({
  baseURL: "/api",
});
// Add a request interceptor
service.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // const cookie = useCookies();
    // const token = cookie.get("admin-token");、

    // 获取token
    // console.log(localStorage.getItem("admin-token"));
    // const token = localStorage.getItem("admin-token");
    const token = getToken();
    // console.log(token);
    if (token) {
      config.headers["token"] = token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast(error.response.data.msg || "请求失败", "error");

    return Promise.reject(error);
  }
);
export default service;

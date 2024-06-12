import Axios from "axios";

import { IAuth } from "../contexts/AuthContext";

import { getPersistedState, getPersistedStateSession } from "./persist-util";
import { ROUTE_API } from "./route-util";

const HttpUtil = Axios.create({
  baseURL: ROUTE_API.root,
});

HttpUtil.interceptors.request.use(async (config) => {
  const persistedState: IAuth =
    getPersistedState(process.env.REACT_APP_PERSIST_AUTH) ||
    getPersistedStateSession(process.env.REACT_APP_PERSIST_AUTH) ||
    {};
  config.headers.Authorization = persistedState?.token
    ? `Bearer ${persistedState?.token}`
    : "";
  config.headers.Accept = "*/*";
  return config;
});
HttpUtil.interceptors.response.use(
  function (res) {
    // const persistedState: IAuth =
    //   getPersistedState(process.env.REACT_APP_PERSIST_AUTH) ||
    //   getPersistedStateSession(process.env.REACT_APP_PERSIST_AUTH) ||
    //   {};
    if (res?.data?.status < 400) {
      return res;
    } else {
      // if (res?.data?.status === 401) {
      //   persistedState?.isLogIn !== undefined && localStorage.clear();
      //   persistedState?.isLogIn !== undefined && sessionStorage.clear();
      //   persistedState?.isLogIn !== undefined && window.location.reload();
      // }
      return res;
      // return Promise.reject(res.data);
    }
  }
  // function (err) {
  //   const res = err.response;
  //   console.log("Res:", res);
  //   if (res) {
  //     if (res?.status === 401) {
  //       localStorage.clear();
  //       alert(res?.data?.error);
  //       window?.location?.reload();
  //     }
  //     return Promise.reject(res.data);
  //   } else {
  //     return Promise.reject(err);
  //   }
  // }
);

export default HttpUtil;

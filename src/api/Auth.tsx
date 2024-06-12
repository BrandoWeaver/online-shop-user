import HttpUtil from "../utils/http-util";
import { ROUTE_API } from "../utils/route-util";

const Auth = {
  login: async (data: { username: string; password: string }) => {
    const res = await HttpUtil.post<Login.ILogin>(ROUTE_API.login, data);
    console.log("res", res);
    return res.data;
  },
  register: async (data: {
    username: string;
    email: string;
    password: string;
    fullname: string;
    address: string;
    phoneNumber: string;
  }) => {
    const res = await HttpUtil.post<Login.IRegister>(ROUTE_API.register, data);
    console.log("res", res);
    return res.data;
  },
};

export { Auth };

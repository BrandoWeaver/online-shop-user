import HttpUtil from "../utils/http-util";
import { ROUTE_API } from "../utils/route-util";

export const NOTIFICATION_API = {
  getNotification: async () => {
    const res = await HttpUtil.get<Imessage.IlistMessage>(
      ROUTE_API.listNotification
    );
    return res.data;
  },
};

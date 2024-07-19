import HttpUtil from "../utils/http-util";
import { ROUTE_API } from "../utils/route-util";
const ShopBanner = {
  shopBanner: async () => {
    const res = await HttpUtil.get<Ibanner.IshopBanner>(ROUTE_API.shopBanner);
    console.log("res", res);
    return res.data;
  },
};
export { ShopBanner };

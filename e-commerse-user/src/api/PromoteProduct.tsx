import HttpUtil from "../utils/http-util";
import { ROUTE_API } from "../utils/route-util";

export const PROMOTIONPRODUCT_API = {
  getProductPromoteList: async () => {
    const res = await HttpUtil.get<IlistproductPromotion.IlistPromotion>(
      ROUTE_API.listProductPromote
    );
    return res.data;
  },
};

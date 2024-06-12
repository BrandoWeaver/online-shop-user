import HttpUtil from "../utils/http-util";
import { ROUTE_API } from "../utils/route-util";

const PRODUCT_API = {
  listProduct: async (cateId?: string, name?: string) => {
    const res = await HttpUtil.get<Iproduct.IproductList>(
      ROUTE_API.listProduct,
      {
        params: {
          cate_id: cateId,
          name: name,
        },
      }
    );
    return res.data;
  },
  pupularProduct: async (minSalesVolume: number) => {
    const res = await HttpUtil.get<Iproduct.IproductList>(
      ROUTE_API.pularProduct,
      {
        params: {
          minSalesVolume: minSalesVolume,
        },
      }
    );
    return res.data;
  },
  listCategory: async () => {
    const res = await HttpUtil.get<Icart.IlistCategory>(ROUTE_API.listCategory);
    return res.data;
  },
};
export { PRODUCT_API };

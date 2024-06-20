import HttpUtil from "../utils/http-util";
import { ROUTE_API } from "../utils/route-util";
interface IorderData {
  userId: string | undefined;
  userName: string;
  lat: number | undefined;
  lng: number | undefined;
  items: {
    product: string;
    quantity: number;
  }[];
  phoneNumber: string;
  notes: string;
  totalPrice: number;
}
const ORDER_API = {
  getListOrder: async (data: { userId: string }) => {
    const res = await HttpUtil.get(ROUTE_API.listOrder, { data });
    return res.data;
  },
  getListUserOrder: async (userId: string) => {
    const res = await HttpUtil.get<IOrdered.IuserOrdered>(
      ROUTE_API.userOrdered.replace(":userId", userId)
    );
    return res.data;
  },
  cancelOrder: async (orderId: string) => {
    const res = await HttpUtil.delete(
      ROUTE_API.cancelOrder.replace(":orderId", orderId)
    );
    return res.data;
  },
  createOrder: async (orderData: IorderData) => {
    const res = await HttpUtil.post(ROUTE_API.createOrder, {
      userId: orderData.userId,
      userName: orderData.userName,
      lat: orderData.lat,
      lng: orderData.lng,
      phoneNumber: orderData.phoneNumber,
      notes: orderData.notes,
      items: orderData.items,
      totalPrice: orderData.totalPrice,
    });
    return res.data;
  },
  orderDetail: async (orderId: string) => {
    const res = await HttpUtil.get<Order.IorderDetail>(
      ROUTE_API.orderDetail.replace(":id", orderId)
    );
    return res.data;
  },
};
export { ORDER_API };

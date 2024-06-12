declare namespace IOrdered {
  export type IuserOrdered = Root2[];

  export interface Root2 {
    _id: string;
    userId: string;
    userName: string;
    lat: number;
    lng: number;
    phoneNumber: string;
    notes: string;
    status: string;
    items: Item[];
    totalPrice: number;
    additionalInfo: string;
    createdAt: string;
    __v: number;
  }

  export interface Item {
    product: Product;
    quantity: number;
    _id: string;
  }

  export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
  }
}

declare namespace Order {
  export interface IorderDetail {
    _id: string;
    userId: UserId;
    userName: string;
    lat: number;
    lng: number;
    phoneNumber: string;
    notes: string;
    status: string;
    items: Item[];
    totalPrice: number;
    createdAt: string;
    __v: number;
    address: string;
  }

  export interface UserId {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
  }

  export interface Item {
    product: Product;
    quantity: number;
    _id: string;
  }

  export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }
}

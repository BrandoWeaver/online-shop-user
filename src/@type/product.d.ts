declare namespace Iproduct {
  export interface IproductList {
    products: Product[];
  }

  export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    cate_id: string;
    quantity: number;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface Icate {
    categories: Category[];
  }

  export interface Category {
    _id: string;
    cate_id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface IpupularProduct {
    popularProducts: PopularProduct[];
  }

  export interface PopularProduct {
    _id: string;
    sku: string;
    name: string;
    description: string;
    price: number;
    cate_id: string;
    quantity: number;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    discountedPrice: number;
    isOnPromotion: boolean;
    salesVolume: number;
    __v: number;
  }
}

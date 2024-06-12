declare namespace IlistproductPromotion {
  export interface IlistPromotion {
    promotionProducts: PromotionProduct[];
  }

  export interface PromotionProduct {
    product: Product;
    discountPercentage: number;
    discountedPrice: number;
  }

  export interface Product {
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

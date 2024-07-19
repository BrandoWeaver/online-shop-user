declare namespace Ibanner {
  export interface IshopBanner {
    message: string;
    banners: Banner[];
  }

  export interface Banner {
    _id: string;
    image: string;
    createdAt: string;
    __v: number;
  }
}

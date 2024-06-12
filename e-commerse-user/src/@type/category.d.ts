declare namespace Icart {
  export interface IlistCategory {
    categories: Category[];
  }

  export interface Category {
    _id: string;
    cate_id: string;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }
}

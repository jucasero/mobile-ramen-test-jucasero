export interface ISubCategory {
  id: string;
  categoryId: string;
  title: string;
  image?: string;
}

export interface ICategory {
  id: string;
  title: string;
  type: string;
  image: string;
}

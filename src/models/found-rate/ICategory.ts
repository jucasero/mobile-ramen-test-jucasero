export interface ISubCategory {
  id: string;
  categoryId: string;
  title: string;
  total: number;
  image?: string;
}

export interface ICategory {
  id: string;
  title: string;
  type: string;
  total: number;
  image: string;
  subCategories: ISubCategory[];
}

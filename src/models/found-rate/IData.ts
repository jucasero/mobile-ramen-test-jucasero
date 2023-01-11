import { ICategory, ISubCategory } from './ICategory';
import { IProduct } from './IProduct';

export interface IDetailData {
  subCategory: ISubCategory;
  total: number;
  products: IProduct[];
  marketArea: string;
}

export interface IFoundRateData {
  category: ICategory;
  total: number;
  detail: IDetailData[];
}

export interface ISendFounRateData {
  message: string;
  status: number;
}

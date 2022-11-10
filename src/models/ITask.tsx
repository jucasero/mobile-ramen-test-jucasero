export interface ITask<T> {
  id: string;
  title: string;
  type: string;
  meta_data: T;
}
export interface IProduct {
  id: string;
  title: string;
  type: string;
  total: number;
}
export interface IMerchandiseReceptionMetaData {
  products: IProduct[];
  total: number;
}

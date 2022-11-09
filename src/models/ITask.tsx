export interface ITask<T> {
  id: string;
  title: string;
  type: string;
  meta_data: T;
}

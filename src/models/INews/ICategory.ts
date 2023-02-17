export interface ICategory {
  id: string;
  title: string;
  total: number;
  type: string;
}

export interface IFile {
  id: string;
  name: string;
  url: string;
}

export interface INew {
  id: string;
  idCategory: string;
  category: string;
  title: string;
  subtitle: string;
  files: Array<IFile>;
  description: string;
  image?: string;
  link?: string;
  readed: boolean;
  date: string;
  pathBack?: string;
}

import { ICategory } from '../models/INews/ICategory';
// import { buildMockData } from './found-rate';

export const news: ICategory[] = [
  {
    id: '1',
    title: 'Category',
    type: 'news/category',
    total: 3,
  },
  {
    id: '2',
    title: 'Comercial',
    type: 'news/comercial',
    total: 1,
  },
  {
    id: '3',
    title: 'Ofertas',
    type: 'news/ofertas',
    total: 2,
  },
  {
    id: '4',
    title: 'Logística',
    type: 'news/logistica',
    total: 2,
  },
];

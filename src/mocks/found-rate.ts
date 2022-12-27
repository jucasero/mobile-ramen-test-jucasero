import { ICategory, ISubCategory } from '../models/found-rate/ICategory';

const dairySubCategories: ISubCategory[] = [
  {
    id: '200',
    categoryId: '20',
    title: 'Leches',
    total: 5,
  },
  {
    id: '201',
    categoryId: '20',
    title: 'Yogurt',
    total: 7,
  },
  {
    id: '202',
    categoryId: '20',
    title: 'Huevos',
    total: 3,
  },
  {
    id: '203',
    categoryId: '20',
    title: 'Bebidas Lácteas',
    total: 5,
  },
  {
    id: '204',
    categoryId: '20',
    title: 'Mantequillas y Margarinas',
    total: 6,
  },
  {
    id: '205',
    categoryId: '20',
    title: 'Postres',
    total: 8,
  },
];

const bakedSubCategories: ISubCategory[] = [
  {
    id: '250',
    categoryId: '21',
    title: 'Panadería envasada',
    total: 5,
  },
  {
    id: '251',
    categoryId: '21',
    title: 'Panadería granel',
    total: 4,
  },
  {
    id: '252',
    categoryId: '21',
    title: 'Masas y Tortillas',
    total: 6,
  },
  {
    id: '253',
    categoryId: '21',
    title: 'Pastelería',
    total: 7,
  },
];

const frozenSubCategories: ISubCategory[] = [
  {
    id: '300',
    categoryId: '22',
    title: 'Verduras Congeladas',
    total: 4,
  },
  {
    id: '301',
    categoryId: '22',
    title: 'Hamburguesas',
    total: 8,
  },
  {
    id: '302',
    categoryId: '22',
    title: 'Helados',
    total: 10,
  },
  {
    id: '303',
    categoryId: '22',
    title: 'Frutas Congeladas',
    total: 3,
  },
  {
    id: '304',
    categoryId: '22',
    title: 'Churrascos, Lomitos y Otros',
    total: 4,
  },
];

const winesSubCategories: ISubCategory[] = [
  {
    id: '350',
    categoryId: '23',
    title: 'Vinos y Espumantes',
    total: 4,
  },
  {
    id: '351',
    categoryId: '23',
    title: 'Cervezas',
    total: 6,
  },
  {
    id: '352',
    categoryId: '23',
    title: 'Licores y Cócteles',
    total: 2,
  },
];

const beautySubCategories: ISubCategory[] = [
  {
    id: '400',
    categoryId: '24',
    title: 'Cremas',
    total: 5,
  },
  {
    id: '401',
    categoryId: '24',
    title: 'Higiene Personal',
    total: 6,
  },
];

const fruitsSubCategories: ISubCategory[] = [
  {
    id: '450',
    categoryId: '25',
    title: 'Frutas',
    total: 3,
  },
  {
    id: '451',
    categoryId: '25',
    title: 'Verduras',
    total: 5,
  },
  {
    id: '452',
    categoryId: '25',
    title: 'Frutos Secos y Semillas',
    total: 2,
  },
];

const seafoodSubCategories: ISubCategory[] = [
  {
    id: '500',
    categoryId: '26',
    title: 'Pescados',
    total: 7,
  },
];

export const categories: ICategory[] = [
  {
    id: '20',
    title: 'Lácteos',
    type: 'dairy',
    total: dairySubCategories.length,
    image: 'https://cdn-icons-png.flaticon.com/32/1772/1772237.png',
    subCategories: dairySubCategories,
  },
  {
    id: '21',
    title: 'Panificados',
    type: 'baked',
    total: bakedSubCategories.length,
    image: 'https://cdn-icons-png.flaticon.com/32/7146/7146171.png',
    subCategories: bakedSubCategories,
  },
  {
    id: '22',
    title: 'Congelados',
    type: 'frozen',
    total: frozenSubCategories.length,
    image: 'https://cdn-icons-png.flaticon.com/32/1654/1654549.png',
    subCategories: frozenSubCategories,
  },
  {
    id: '23',
    title: 'Vinos, Cervezas y Licores',
    type: 'wines',
    total: winesSubCategories.length,
    image: 'https://cdn-icons-png.flaticon.com/32/763/763113.png',
    subCategories: winesSubCategories,
  },
  {
    id: '24',
    title: 'Belleza y Cuidado Personal',
    type: 'beauty',
    total: beautySubCategories.length,
    image: 'https://cdn-icons-png.flaticon.com/32/2413/2413171.png',
    subCategories: beautySubCategories,
  },
  {
    id: '25',
    title: 'Frutas y Verduras',
    type: 'fruits-vegetables',
    total: fruitsSubCategories.length,
    image: 'https://cdn-icons-png.flaticon.com/32/3362/3362637.png',
    subCategories: fruitsSubCategories,
  },
  {
    id: '26',
    title: 'Pescadería',
    type: 'seafood',
    total: seafoodSubCategories.length,
    image: 'https://cdn-icons-png.flaticon.com/32/3081/3081974.png',
    subCategories: seafoodSubCategories,
  },
];

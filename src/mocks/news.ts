import { ICategory, INew } from '../models/INews/ICategory';

export const categories: ICategory[] = [
  {
    id: '1',
    title: 'Category',
    type: 'news/category',
    total: 1,
  },
  {
    id: '2',
    title: 'Comercial',
    type: 'news/comercial',
    total: 2,
  },
  {
    id: '3',
    title: 'Ofertas',
    type: 'news/ofertas',
    total: 1,
  },
  {
    id: '4',
    title: 'Logística',
    type: 'news/logistica',
    total: 1,
  },
];

export const news: INew[] = [
  {
    id: '63923k9dj8cnm567dcc1d356',
    idCategory: '2',
    category: 'Comercial',
    subtitle: 'Implementación de orfertas',
    title: 'Nueva promoción de verano',
    description:
      'Durante el mes de enero, ofrecemos un 20% de descuento en todos nuestros productos de verano, incluyendo ropa, accesorios de playa y artículos de piscina.',
    files: [
      {
        id: '1',
        name: 'specifications.pdf',
        url: 'https://example.com/specifications.pdf',
      },
      {
        id: '2',
        name: 'example.pdf',
        url: 'https://example.com/specifications.pdf',
      },
      {
        id: '3',
        name: 'example-2.pdf',
        url: 'https://example.com/specifications.pdf',
      },
    ],
    image:
      'https://media.ambito.com/p/2de408ab1a6292780bc4dd30eae7e0b7/adjuntos/351/imagenes/040/360/0040360411/730x0/smart/cencosudjpeg.jpeg',
    link: 'https://cencosud.com/promociones',
    readed: false,
    date: 'Mar 7 feb. 2023',
  },
  {
    id: '63974ff8b008652kk8jd99j8',
    idCategory: '3',
    category: 'Ofertas',
    subtitle: 'Descuentos',
    title: 'Oferta especial de fin de semana',
    description:
      'Este fin de semana, ofrecemos un descuento adicional del 10% en todos nuestros productos con precios ya reducidos.',
    files: [
      {
        id: '1',
        name: 'specifications.pdf',
        url: 'https://example.com/specifications.pdf',
      },
    ],
    image:
      'https://media.ambito.com/p/2de408ab1a6292780bc4dd30eae7e0b7/adjuntos/351/imagenes/040/360/0040360411/730x0/smart/cencosudjpeg.jpeg',
    link: 'https://cencosud.com/ofertas',
    readed: true,
    date: 'Lun 30 ene. 2023',
  },
  {
    id: '63974ff8b00jk98sj781d08d',
    idCategory: '4',
    category: 'Logística',
    subtitle: 'Horario de atención',
    title: 'Cambios en el horario de recepción de mercancías',
    description:
      'A partir de la próxima semana, el horario de recepción de mercancías será de lunes a viernes de 9:00 a.m. a 4:00 p.m. Por favor, planifique sus envíos de mercancías de manera adecuada.',
    files: [
      {
        id: '1',
        name: 'specifications.pdf',
        url: 'https://example.com/specifications.pdf',
      },
    ],
    image:
      'https://media.ambito.com/p/2de408ab1a6292780bc4dd30eae7e0b7/adjuntos/351/imagenes/040/360/0040360411/730x0/smart/cencosudjpeg.jpeg',
    link: 'https://cencosud.com/logistica',
    readed: false,
    date: 'Mar 7 feb. 2023',
  },
  {
    id: '63974ff8b008653jd8g12223',
    idCategory: '1',
    category: 'Category',
    subtitle: 'Productos electrónicos',
    title: 'Actualización de categorías de productos',
    description:
      'A partir de ahora, los productos de electrónica estarán en una nueva categoría llamada Tecnología y los productos de jardinería estarán en una nueva categoría llamada Exteriores.',
    files: [
      {
        id: '1',
        name: 'specifications.pdf',
        url: 'https://example.com/specifications.pdf',
      },
    ],
    image:
      'https://media.ambito.com/p/2de408ab1a6292780bc4dd30eae7e0b7/adjuntos/351/imagenes/040/360/0040360411/730x0/smart/cencosudjpeg.jpeg',
    link: 'https://cencosud.com/categorias',
    readed: false,
    date: 'Mar 7 feb. 2023',
  },
  {
    id: '63923k9dj8cnm567dcc1d357',
    idCategory: '2',
    category: 'Comercial',
    subtitle: 'Nuevo departamento',
    title: 'Inauguración de departamento de electrónica',
    description:
      'Estamos emocionados de anunciar la apertura de nuestro nuevo departamento de electrónica, donde encontrarás una amplia variedad de productos de alta calidad.',
    files: [
      {
        id: '1',
        name: 'specifications.pdf',
        url: 'https://example.com/specifications.pdf',
      },
    ],
    image:
      'https://media.ambito.com/p/2de408ab1a6292780bc4dd30eae7e0b7/adjuntos/351/imagenes/040/360/0040360411/730x0/smart/cencosudjpeg.jpeg',
    link: 'https://cencosud.com/electronica',
    readed: false,
    date: 'Lun 30 ene. 2023',
  },
  {
    id: '63974ff8b008652kk8jd99j9',
    idCategory: '3',
    category: 'Ofertas',
    subtitle: 'Descuentos',
    title: 'Venta de temporada',
    description:
      'Durante todo el mes de febrero, ofrecemos un descuento del 50% en todos nuestros productos de invierno, incluyendo abrigos, botas y guantes.',
    files: [
      {
        id: '1',
        name: 'specifications.pdf',
        url: 'https://example.com/specifications.pdf',
      },
    ],
    image:
      'https://media.ambito.com/p/2de408ab1a6292780bc4dd30eae7e0b7/adjuntos/351/imagenes/040/360/0040360411/730x0/smart/cencosudjpeg.jpeg',
    link: 'https://cencosud.com/ofertas',
    readed: true,
    date: 'Lun 30 ene. 2023',
  },
  {
    id: '63974ff8b00jk98sj781d08e',
    idCategory: '4',
    category: 'Logística',
    subtitle: 'Información de envío',
    title: 'Cambios en los términos de envío',
    description:
      'A partir de ahora, todos los envíos serán realizados por una compañía de mensajería externa. Por favor, tenga en cuenta que los tiempos de entrega pueden variar.',
    files: [
      {
        id: '1',
        name: 'specifications.pdf',
        url: 'https://example.com/specifications.pdf',
      },
    ],
    image:
      'https://media.ambito.com/p/2de408ab1a6292780bc4dd30eae7e0b7/adjuntos/351/imagenes/040/360/0040360411/730x0/smart/cencosudjpeg.jpeg',
    link: 'https://cencosud.com/logistica',
    readed: true,
    date: 'Lun 30 ene. 2023',
  },
  {
    id: '63974ff8b00sj638dk724d08d',
    idCategory: '2',
    category: 'Comercial',
    subtitle: 'Nuevos productos',
    title: 'Llegada de productos exclusivos',
    description:
      'Estamos entusiasmados de anunciar la llegada de productos exclusivos a nuestros locales. Ven y descubre lo último en moda y electrónica.',
    files: [
      {
        id: '1',
        name: 'specifications.pdf',
        url: 'https://example.com/specifications.pdf',
      },
    ],
    image:
      'https://media.ambito.com/p/2de408ab1a6292780bc4dd30eae7e0b7/adjuntos/351/imagenes/040/360/0040360411/730x0/smart/cencosudjpeg.jpeg',
    link: 'https://cencosud.com/nuevos_productos',
    readed: true,
    date: 'Mar 7 feb. 2023',
  },
  {
    id: '63974ff8b00jk98sj781d06g',
    idCategory: '3',
    category: 'Ofertas',
    subtitle: 'Descuentos en productos seleccionados',
    title: 'Oferta en productos de belleza',
    description:
      'Durante toda esta semana, ofrecemos un 30% de descuento en una selección de productos de belleza y cuidado personal.',
    files: [
      {
        id: '1',
        name: 'specifications.pdf',
        url: 'https://example.com/specifications.pdf',
      },
    ],
    image:
      'https://media.ambito.com/p/2de408ab1a6292780bc4dd30eae7e0b7/adjuntos/351/imagenes/040/360/0040360411/730x0/smart/cencosudjpeg.jpeg',
    link: 'https://cencosud.com/ofertas_belleza',
    readed: false,
    date: 'Mar 7 feb. 2023',
  },
];

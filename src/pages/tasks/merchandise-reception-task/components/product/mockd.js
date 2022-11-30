export const mockedProducts = [
  {
    shop: '1235',
    units_found: '10',
    description: 'Leche semidescremada frutilla 1 L',
    ean: '7613036111058',
    image: 'leche-semidescremada',
    stock_nrt: '180',
    unit_of_meansure: 'EAN',
    article_number: '111058',
    pro_origin_cause: 'origin',
    provider: 'Leches Soprole',
    block_type: 'lacteos',
    brand: 'Soprole',
    last_reception_date: '1669294039',
    transit_stock: '10',
    units_requested: '50',
    transit_stock_date: '1668097258',
    average_sale: '20.00',
    units_sold: '100',
  },
];

// Just to mock product data by quantity products
export const mockProducts = (qtyProducts = 0) => {
  const products = [];
  for (let index = 0; index < qtyProducts; index++) {
    products.push({
      ...mockedProducts[0],
      shop: `${mockedProducts[0].shop}${index}`,
    });
  }
  return products;
};

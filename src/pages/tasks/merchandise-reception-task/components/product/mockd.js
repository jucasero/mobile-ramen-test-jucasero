export const mockProducts = (mockedProducts = [], qtyProducts = 0) => {
  const products = [];
  for (let index = 0; index < qtyProducts; index++) {
    products.push({
      ...mockedProducts[0],
      block_type: `${mockedProducts[0].block_type}${index}`,
    });
  }
  return products;
};

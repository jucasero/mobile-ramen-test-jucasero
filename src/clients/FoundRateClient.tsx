import WithBootedClient from '../libs/WithBootedClient';
import { RESTClient } from '@team_eureka/eureka-ionic-core';
import { IProduct } from '../models/ITasks/IProduct';
import { mock_products } from '../mocks/tasks';

class MerchandiseReceptionProdcutClient
  extends RESTClient
  implements WithBootedClient
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async boot() {}

  async getProductsByCategory(categoryID: string): Promise<IProduct[]> {
    // Add your API call here
    const callApi = new Promise<IProduct[]>((resolve) => {
      setTimeout(() => {
        const products: IProduct[] = mock_products;
        const filteredProducts = products.filter(
          (product: IProduct) => product.category === categoryID
        );
        resolve(filteredProducts);
      }, 500);
    });
    const response = await callApi;
    return response;
  }
}

export default new MerchandiseReceptionProdcutClient({
  baseURL: process.env.REACT_APP_API_ENDPOINT!,
});

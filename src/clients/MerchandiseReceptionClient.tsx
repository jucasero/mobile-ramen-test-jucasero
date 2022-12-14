import WithBootedClient from '../libs/WithBootedClient';
import { RESTClient } from '@team_eureka/eureka-ionic-core';
import { IProduct } from '../models/ITasks/IProduct';
import { ICategory } from '../models/ITasks/ICategory';
import { mock_categories, mock_products } from '../data/merchandise-reception';

class MerchandiseReceptionProdcutClient
  extends RESTClient
  implements WithBootedClient
{
  async boot() {}

  // TODO: Obtener tareas de recepcion de mercaderia (polling) / jwt / TasksClient

  async getCategories(taskType: string) {
    //apiCall use taskType
    const apiCall = new Promise<ICategory[]>((resolve) =>
      setTimeout(() => {
        resolve(mock_categories);
      }, 500)
    );
    const response = await apiCall;
    return response;
  }

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

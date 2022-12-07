import WithBootedClient from '../libs/WithBootedClient';
import { RESTClient } from '@team_eureka/eureka-ionic-core';
import { IProduct } from '../models/ITasks/IProduct';
import { ICategory } from '../models/ITasks/ICategory';

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
        resolve([
          { id: '20', title: 'Lácteos', type: 'dairy', total: 1 },
          { id: '21', title: 'Panificados', type: 'baked', total: 3 },
          { id: '22', title: 'Almacén', type: 'warehouse', total: 2 },
          { id: '23', title: 'Vinos', type: 'wines', total: 2 },
          {
            id: '24',
            title: 'Mundo bio',
            type: 'bio-world',
            total: 1,
          },
        ]);
      }, 500)
    );
    const response = await apiCall;
    return response;
  }

  async getProductsByCategory(categoryID: string): Promise<IProduct[]> {
    // Add your API call here
    const callApi = new Promise<IProduct[]>((resolve) => {
      setTimeout(() => {
        const products = [
          {
            id: '123',
            image: 'images',
            description: 'Bebida lactea Trencitos',
            ean: 'EAN 7802800500611',
            stock_nrt: '115',
            unit_of_meansure: '200ml',
            units_found: '23',
            units_sold: '2',
            article_number: '56783',
            pro_origin_cause: 'XXXXXXXXXXXX',
            provider: 'Nestle chile s.a.',
            block_type: 'XXXXXXXXXXXX',
            brand: 'Trencito',
            average_sale: '22',
            last_reception_date: 'Mon Dec 05 2022 05:31:44',
            transit_stock: '500',
            units_requested: '1200',
            transit_stock_date: '1655913706869',
            shop: 'CornerShop',
            category: 'dairy',
            product_offer: {
              sin_stock: true,
              promotion: true,
              mundo_brio: false,
            },
          },
        ];
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

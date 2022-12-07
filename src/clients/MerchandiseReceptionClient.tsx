import WithBootedClient from '../libs/WithBootedClient';
import { RESTClient } from '@team_eureka/eureka-ionic-core';
import { IProduct } from '../models/IProduct';

class MerchandiseReceptionProdcutClient
  extends RESTClient
  implements WithBootedClient
{
  async boot() {}

  // TODO: Mezclar ambos cambios
  // TODO: Obtener tareas de recepcion de mercaderia (polling) / jwt / TasksClient
  // TODO: getDetailTask => mover aqui
  async getProductsByCategory(categoryID: string): Promise<IProduct[]> {
    // Add your API call here
    const callApi = new Promise<IProduct[]>((resolve) => {
      setTimeout(() => {
        const products = [
          {
            image: 'images',
            description: 'Bebida lactea Trencitosss',
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

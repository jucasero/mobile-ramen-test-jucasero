import WithBootedClient from "../libs/WithBootedClient";
import { RESTClient } from "@team_eureka/eureka-ionic-core";
import { IProduct } from "../models/IProduct";

class FoundRateClient extends RESTClient implements WithBootedClient {
  async boot() {}

  async getFoundRateProducts(): Promise<IProduct[]> {
    // Add your API call here
    return [
      {
        image: "images",
        description: "Bebida lactea Trencito",
        ean: "EAN 7802800500611",
        stock_nrt: "115",
        unit_of_meansure: "200ml",
        units_found: "23",
        units_sold: "2",
        article_number: "56783",
        pro_origin_cause: "XXXXXXXXXXXX",
        provider: "Nestle chile s.a.",
        block_type: "XXXXXXXXXXXX",
        brand: "Trencito",
        average_sale: "22",
        last_reception_date: "Thu Jun 20 2022 19:31:44",
        transit_stock: "500",
        units_requested: "1200",
        transit_stock_date: "1655913706869",
        shop: "CornerShop",
      },
      {
        image: "images",
        description: "Bebida lactea Trencito",
        ean: "EAN 7802800500612",
        stock_nrt: "115",
        unit_of_meansure: "200ml",
        units_found: "23",
        units_sold: "2",
        article_number: "56783",
        pro_origin_cause: "XXXXXXXXXXXX",
        provider: "Nestle chile s.a.",
        block_type: "XXXXXXXXXXXX",
        brand: "Trencito",
        average_sale: "22",
        last_reception_date: "Thu Jun 20 2022 19:31:44",
        transit_stock: "500",
        units_requested: "1200",
        transit_stock_date: "1655913706869",
        shop: "CornerShop",
      },
      {
        image: "images",
        description: "Bebida lactea Trencito",
        ean: "EAN 7802800500613",
        stock_nrt: "115",
        unit_of_meansure: "200ml",
        units_found: "23",
        units_sold: "2",
        article_number: "56783",
        pro_origin_cause: "XXXXXXXXXXXX",
        provider: "Nestle chile s.a.",
        block_type: "XXXXXXXXXXXX",
        brand: "Trencito",
        average_sale: "22",
        last_reception_date: "Thu Jun 20 2022 19:31:44",
        transit_stock: "500",
        units_requested: "1200",
        transit_stock_date: "1655913706869",
        shop: "CornerShop",
      },
      {
        image: "images",
        description: "Bebida lactea Trencito",
        ean: "EAN 7802800500614",
        stock_nrt: "115",
        unit_of_meansure: "200ml",
        units_found: "23",
        units_sold: "2",
        article_number: "56783",
        pro_origin_cause: "XXXXXXXXXXXX",
        provider: "Nestle chile s.a.",
        block_type: "XXXXXXXXXXXX",
        brand: "Trencito",
        average_sale: "22",
        last_reception_date: "Thu Jun 20 2022 19:31:44",
        transit_stock: "500",
        units_requested: "1200",
        transit_stock_date: "1655913706869",
        shop: "CornerShop",
      },
      {
        image: "images",
        description: "Bebida lactea Trencito",
        ean: "EAN 7802800500615",
        stock_nrt: "115",
        unit_of_meansure: "200ml",
        units_found: "23",
        units_sold: "2",
        article_number: "56783",
        pro_origin_cause: "XXXXXXXXXXXX",
        provider: "Nestle chile s.a.",
        block_type: "XXXXXXXXXXXX",
        brand: "Trencito",
        average_sale: "22",
        last_reception_date: "Thu Jun 20 2022 19:31:44",
        transit_stock: "500",
        units_requested: "1200",
        transit_stock_date: "1655913706869",
        shop: "CornerShop",
      },
    ];
  }

  async submitFinishAlert(product: IProduct): Promise<any> {
    // Add your API call here
    return {};
  }

  async reportProductOutOfStockCause(
    product: IProduct,
    causeType: string,
    otherCause?: string
  ): Promise<any> {
    // Add your API call here
    return {};
  }

  async replenishProduct(product: IProduct): Promise<any> {
    // Add your API call here
    return {};
  }
}

export default new FoundRateClient({
  baseURL: process.env.REACT_APP_API_ENDPOINT!,
});

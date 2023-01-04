export interface IProduct {
  id: string;
  shop: string;
  units_found?: number;
  description?: string;
  ean?: string;
  image?: string;
  stock_nrt?: number;
  unit_of_meansure?: string;
  article_number?: number;
  pro_origin_cause?: string;
  provider?: string;
  block_type?: string;
  brand?: string;
  last_reception_date?: string;
  transit_stock?: number;
  units_requested?: number;
  transit_stock_date?: number;
  average_sale?: number;
  units_sold?: number;
  category: string;
  product_offer: {
    no_stock: boolean;
    promotion: boolean;
    mundo_brio: boolean;
  };
}
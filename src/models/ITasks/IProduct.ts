export interface IProduct {
  id: string;
  image?: string;
  category?: string;
  shop: string;
  description?: string;
  location?: string;
  stock_nrt?: number;
  units_found?: number;
  units_sold?: number;
  ean?: number;
  article_number?: number;
  provider?: string;
  brand?: string;
  pro_origin_cause?: string;
  block_type?: string;
  average_sale?: number;
  last_reception_date?: string;
  order_code?: string;
  units_requested?: number;
  delivery_date?: string;
  isAvailable?: boolean;
}
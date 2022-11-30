import { useState, useEffect } from 'react';
import { IonPage, IonContent, IonList } from '@ionic/react';
import { useHistory } from 'react-router';
import { IProduct as IProductCategory } from '../../../../../../models/ITask';
import { IProduct } from '../../../../../../models/IProduct';
import TaskHeader from '../../TaskHeader';
import Product from '../product';
import './index.sass';

import { routes } from '../../../../constants';
import { mockProducts } from '../mockd';

interface ILocationState extends History {
  productCategory: IProductCategory;
  products: IProductCategory[];
}

// Merchandise reception products list
const Products: React.FC = () => {
  const history = useHistory<History>();
  const locationState = history.location.state as ILocationState;
  const [products, setProducts] = useState<IProduct[]>(
    mockProducts(locationState?.productCategory?.total) // Replace by API
  );
  const productCategories: IProductCategory[] = locationState.products;
  const productCategory: IProductCategory = locationState.productCategory || {};

  useEffect(() => {
    if (!history.location.state) history.replace('/');
  }, [history]);

  return (
    <IonPage>
      <TaskHeader
        title={productCategory.title}
        backRoute={routes.merchandiseReception}
        data={{ products: productCategories }}
      />
      <IonContent className="ion-padding">
        <IonList>
          {products?.map((product: IProduct) => (
            <Product key={product.shop} product={product} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Products;

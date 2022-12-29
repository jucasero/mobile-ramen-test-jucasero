import { useEffect } from 'react';
import { IonPage, IonContent, IonList } from '@ionic/react';
import { useHistory } from 'react-router';
import { ITask } from '../../../../../../models/ITasks/ITask';
import { ICategory } from '../../../../../../models/ITasks/ICategory';
import { IProduct } from '../../../../../../models/ITasks/IProduct';
import TaskHeader from '../../task-header';
import { ProductSkeleton } from '../../../../../../components/loaders';
import Product from '../product';
import useFetch from '../../../../../../hooks/useFetch';
import MerchandiseReceptionClient from '../../../../../../clients/MerchandiseReceptionClient';
import {
  rootRoute,
  merchandiseReceptionRoutes,
} from '../../../../../../routes';
import './index.sass';

interface ILocationState {
  productCategory: ICategory;
  merchandise_reception: ITask;
}

// Merchandise reception products list
const Products: React.FC = () => {
  const history = useHistory<ILocationState>();
  const locationState = history.location.state;
  const productCategory: ICategory = locationState.productCategory || {};
  const [getProductsByCategory, products, isLoading] = useFetch(
    MerchandiseReceptionClient.getProductsByCategory(productCategory.type)
  );

  useEffect(() => {
    if (!locationState) history.replace(rootRoute);
  }, [history, locationState]);

  useEffect(() => {
    getProductsByCategory();
  }, []);

  const renderLoadingProducts = () => (
    <ProductSkeleton qtyProducts={productCategory.total} />
  );

  const renderProductsList = () => (
    <IonList>
      {products?.map((product: IProduct) => (
        <Product key={product.id} product={product} />
      ))}
    </IonList>
  );

  return (
    <IonPage>
      <TaskHeader
        title={productCategory.title}
        backRoute={merchandiseReceptionRoutes.root}
        data={locationState.merchandise_reception}
      />
      <IonContent className='ion-padding'>
        {isLoading ? renderLoadingProducts() : renderProductsList()}
      </IonContent>
    </IonPage>
  );
};

export default Products;

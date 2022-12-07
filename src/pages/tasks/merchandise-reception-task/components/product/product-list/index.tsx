import { useEffect } from 'react';
import { IonPage, IonContent, IonList } from '@ionic/react';
import { useHistory } from 'react-router';
import { ICategory } from '../../../../../../models/ITasks/ICategory';
import { IProduct } from '../../../../../../models/IProduct';
import TaskHeader from '../../task-header';
import Product from '../product';
import { ProductSkeleton } from '../../../../../../components/loaders';
import useFetch from '../../../../../../hooks/useFetch';
import MerchandiseReceptionClient from '../../../../../../clients/MerchandiseReceptionClient';
import { routes } from '../../../constants';
import './index.sass';

interface ILocationState {
  productCategory: ICategory;
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
    if (!locationState) history.replace('/');
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
        // Please check what should be the unique key ?
        <Product key={product.block_type} product={product} />
      ))}
    </IonList>
  );

  return (
    <IonPage>
      <TaskHeader
        title={productCategory.title}
        backRoute={routes.merchandiseReception}
      />
      <IonContent className="ion-padding">
        {isLoading ? renderLoadingProducts() : renderProductsList()}
      </IonContent>
    </IonPage>
  );
};

export default Products;

import { useState, useEffect } from 'react';
import { IonPage, IonContent, IonList, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router';
import { IProduct as IProductCategory } from '../../../../../../models/ITask';
import { IProduct } from '../../../../../../models/IProduct';
import TaskHeader from '../../TaskHeader';
import Product from '../product';
import { ProductSkeleton } from '../../../../../../components/loaders';
import MerchandiseReceptionClient from '../../../../../../clients/MerchandiseReceptionClient';
import './index.sass';

import { routes } from '../../../constants';

enum Modes {
  LOADING = 'LOADING',
  INITIAL_STATE = 'INITIAL_STATE',
  PRODUCT_LOADED = 'PRODUCT_LOADED',
}

interface ILocationState extends History {
  productCategory: IProductCategory;
  products: IProductCategory[];
}

// Merchandise reception products list
const Products: React.FC = () => {
  const history = useHistory<History>();
  const [mode, setMode] = useState<Modes>(Modes.INITIAL_STATE);
  const [products, setProducts] = useState<IProduct[]>();
  const locationState = history.location.state as ILocationState;
  const productCategories: IProductCategory[] = locationState?.products;
  const productCategory: IProductCategory =
    locationState?.productCategory || {};

  useEffect(() => {
    if (!history.location.state) history.replace('/');
  }, [history]);

  const load = async () => {
    setMode(Modes.INITIAL_STATE);
    const products = await MerchandiseReceptionClient.getProductsByCategory(
      productCategory.type
    );
    setProducts(products);
    setMode(Modes.PRODUCT_LOADED);
  };

  // TODO: Need's to replace by React Query ???
  useEffect(() => {
    load();
  }, []);

  const renderLOADING = () => <IonLoading isOpen={true}></IonLoading>;

  const renderINITIAL_STATE = () => (
    <ProductSkeleton qtyProducts={productCategory.total} />
  );

  const renderPRODUCT_LOADED = () => (
    <IonList>
      {products?.map((product: IProduct) => (
        // Please check what should be the unique key ?
        <Product key={product.block_type} product={product} />
      ))}
    </IonList>
  );

  const renders: Record<Modes, Function> = {
    [Modes.LOADING]: renderLOADING,
    [Modes.INITIAL_STATE]: renderINITIAL_STATE,
    [Modes.PRODUCT_LOADED]: renderPRODUCT_LOADED,
  };

  return (
    <IonPage>
      <TaskHeader
        title={productCategory.title}
        backRoute={routes.merchandiseReception}
        data={{ products: productCategories }}
      />
      <IonContent className="ion-padding">
        {(() => {
          const renderModeFunction = renders[mode];
          return (
            (renderModeFunction && renderModeFunction()) || <div>{mode}</div>
          );
        })()}
      </IonContent>
    </IonPage>
  );
};

export default Products;

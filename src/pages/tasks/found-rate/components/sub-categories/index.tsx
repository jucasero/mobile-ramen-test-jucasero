import { useEffect } from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
import {
  ICategory,
  ISubCategory,
} from '../../../../../models/found-rate/ICategory';
import { ITask } from '../../../../../models/ITasks/ITask';
import TaskHeader from '../../components/TaskHeader';
import AccordionOption from '../../../../../components/accordion-option';
import Product from '../product';
import { rootRoute, foundRateRoutes } from '../../../../../routes';
import location from '../../../../../assets/media/location.svg';
import './index.sass';

interface ILocationState {
  category: ICategory;
  task: ITask;
}

const SubCategories: React.FC = () => {
  const history = useHistory<ILocationState>();
  const locationState: ILocationState = history.location.state;
  const categoryState: ICategory = locationState.category || {};

  useEffect(() => {
    if (!categoryState) history.replace(rootRoute);
  }, []);

  const product: any = {
    id: '63974ff8b0086567dcc1d08d',
    image:
      'https://santaisabel.vtexassets.com/arquivos/ids/156719-750-750?width=750&height=750&aspect=true',
    description: 'Leche semidescremada frutilla 1 L',
    unit_of_meansure: 'Litro',
    provider: 'Soprole Natural',
    brand: 'Soprole',
    ean: '9722195394028',
    stock_nrt: 121,
    units_found: 10,
    units_sold: 38,
    article_number: 91751,
    pro_origin_cause: 'XXXXXXXXXXXX',
    block_type: 'XXXXXXXXXXXX',
    average_sale: 18,
    last_reception_date: 'Sat Dec 10 2022 13:32:32',
    transit_stock: 258,
    units_requested: 58,
    transit_stock_date: 1670575680,
    shop: 'CornerShop',
    category: 'dairy',
    product_offer: {
      no_stock: true,
      promotion: true,
      mundo_brio: false,
    },
  };

  return (
    <>
      <TaskHeader
        title={categoryState.title}
        backRoute={foundRateRoutes.root}
        data={locationState.task}
      />
      <IonContent className='ion-padding'>
        {categoryState.subCategories?.map((subCategory: ISubCategory) => (
          <AccordionOption
            key={subCategory.id}
            title={subCategory.title}
            total={subCategory.total}
          >
            <Product product={product} />
            <Product product={product} />
            <div className='sub-category-footer  '>
              <IonIcon icon={location} />
              <span>Sector estantes, Pasillo 4, Estante 36</span>
            </div>
          </AccordionOption>
        ))}
      </IonContent>
    </>
  );
};

export default SubCategories;

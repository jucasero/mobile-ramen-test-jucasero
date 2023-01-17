import { useEffect } from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
import { ICategory } from '../../../../../models/found-rate/ICategory';
import {
  IFoundRateData,
  IDetailData,
} from '../../../../../models/found-rate/IData';
import { ITask } from '../../../../../models/ITasks/ITask';
import { TaskHeader, Product } from '../../components';
import AccordionOption from '../../../../../components/accordion-option';
import { rootRoute, foundRateRoutes } from '../../../../../routes';
import location from '../../../../../assets/media/location.svg';
import './index.sass';

interface ILocationState {
  data: IFoundRateData;
  task: ITask;
}

// Found Rate Sub-Category list
const SubCategories: React.FC = () => {
  const history = useHistory<ILocationState>();
  const locationState: ILocationState = history.location.state;
  const categoryState: ICategory = locationState.data?.category || null;
  const detailDataState: IDetailData[] = locationState.data?.detail || [];

  useEffect(() => {
    if (!categoryState) history.replace(rootRoute);
  }, []);

  return (
    <>
      <TaskHeader
        title={categoryState.title}
        backRoute={foundRateRoutes.root}
        data={locationState.task}
      />
      <IonContent className='ion-padding'>
        {detailDataState?.map((detail: IDetailData) => (
          <AccordionOption
            key={detail.subCategory.id}
            title={detail.subCategory.title}
            total={detail.total}
          >
            {detail.products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
            <div className='sub-category-footer  '>
              <IonIcon icon={location} />
              <span>{detail.marketArea}</span>
            </div>
          </AccordionOption>
        ))}
      </IonContent>
    </>
  );
};

export default SubCategories;

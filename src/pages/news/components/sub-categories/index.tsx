import { useEffect } from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
import TaskHeader from '../TaskHeader';
import { ICategory } from '../../../../models/INews/ICategory';
import './index.sass';

interface IFoundRateData {
  category: ICategory;
  total: number;
}

interface ILocationState {
  title: string;
  // data: IFoundRateData;
  // task: ICategory;
}

// Found Rate Sub-Category list
const SubCategories: React.FC = () => {
  const history = useHistory<ILocationState>();
  const locationState: ILocationState = history.location.state;
  // const categoryState: ICategory = locationState?.title || {};
  // const detailDataState: IDetailData[] = locationState.data?.detail || [];

  // useEffect(() => {
  //   if (!categoryState) history.replace(rootRoute);
  // }, []);

  console.log(locationState);
  return (
    <>
      <TaskHeader
        title={locationState.title}
        backRoute='/'
        // data={locationState.task}
      />
      {/* <IonContent className='ion-padding'>
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
      </IonContent> */}
    </>
  );
};

export default SubCategories;

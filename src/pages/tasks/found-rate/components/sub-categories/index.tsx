import { useEffect } from 'react';
import { IonContent } from '@ionic/react';
import { useHistory } from 'react-router';
import {
  ICategory,
  ISubCategory,
} from '../../../../../models/found-rate/ICategory';
import { ITask } from '../../../../../models/ITasks/ITask';
import TaskHeader from '../../components/TaskHeader';
import AccordionOption from '../../../../../components/accordion-option';
import { rootRoute, foundRateRoutes } from '../../../../../routes';

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
            <h3>Content</h3>
          </AccordionOption>
        ))}
      </IonContent>
    </>
  );
};

export default SubCategories;

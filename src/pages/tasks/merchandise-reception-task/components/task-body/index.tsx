import { useEffect } from 'react';
import { IonContent } from '@ionic/react';
import { useHistory } from 'react-router';
import TaskCard from '../../../../../components/task-card';
import bakedImage from '../../../../../assets/media/task/baked.svg';
import { ITask } from '../../../../../models/ITasks/ITask';
import { ICategory } from '../../../../../models/ITasks/ICategory';
import MerchandiseReceptionClient from '../../../../../clients/MerchandiseReceptionClient';
import useFetch from '../../../../../hooks/useFetch';
import CardSkeleton from '../../../../../components/card-skeleton';
import { routes } from '../../constants';

const TaskBody = () => {
  const history = useHistory<ITask>();
  const locationState = history.location.state;
  const [fetchCategories, categories, isLoading] = useFetch(
    MerchandiseReceptionClient.getCategories(locationState?.type)
  );

  useEffect(() => {
    if (!locationState) history.replace('/');
  }, [history, locationState]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirection to merchandise reception products list
  const handleProductsByCategory = (category: ICategory) => {
    const state: any = { productCategory: category };
    const productCategoryRoute = `${routes.productCategory.replace(
      ':productCategory',
      category.type.toLocaleLowerCase()
    )}`;
    history.replace(productCategoryRoute, state);
  };

  return (
    <IonContent className="ion-padding">
      {isLoading && <CardSkeleton numberOfcards={5} />}
      {categories &&
        categories.map((category: ICategory) => (
          <TaskCard
            key={category.id}
            image={bakedImage}
            title={category.title}
            onClick={() => handleProductsByCategory(category)}
            total={category.total}
          />
        ))}
    </IonContent>
  );
};

export default TaskBody;

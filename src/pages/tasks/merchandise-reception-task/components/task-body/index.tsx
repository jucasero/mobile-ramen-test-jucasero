import { useEffect } from 'react';
import { IonContent } from '@ionic/react';
import { useHistory } from 'react-router';
import { TaskCard } from '../../../../../components';
import { ITask } from '../../../../../models/ITasks/ITask';
import { ICategory } from '../../../../../models/ITasks/ICategory';
import MerchandiseReceptionClient from '../../../../../clients/MerchandiseReceptionClient';
import { useFetch } from '../../../../../hooks';
import { TaskSkeleton } from '../../../../../components/loaders';
import { routes } from '../../../../../constants';

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
  const redirectProductsByCategory = (category: ICategory) => {
    const state: any = {
      productCategory: category,
      merchandise_reception: locationState,
    };
    const productCategoryRoute = `${routes.productCategory.replace(
      ':productCategory',
      category.type.toLocaleLowerCase()
    )}`;
    history.replace(productCategoryRoute, state);
  };

  return (
    <IonContent className="ion-padding">
      {isLoading && <TaskSkeleton cardsNumber={locationState.total} />}
      {categories &&
        categories.map((category: ICategory) => (
          <TaskCard
            key={category.id}
            image={category.image}
            title={category.title}
            onClick={() => redirectProductsByCategory(category)}
            total={category.total}
            boxIcon
          />
        ))}
    </IonContent>
  );
};

export default TaskBody;

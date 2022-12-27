import { useEffect } from 'react';
import { IonContent } from '@ionic/react';
import { useHistory } from 'react-router';
import useFetch from '../../../../../hooks/useFetch';
import FoundRateClient from '../../../../../clients/FoundRateClient';
import { ITask } from '../../../../../models/ITasks/ITask';
import { ICategory } from '../../../../../models/found-rate/ICategory';
import { TaskSkeleton } from '../../../../../components/loaders';
import TaskCard from '../../../../../components/task-card';
import { routes } from '../../../../../routes'; // TODO: Needs to be separated by found-rate directory ?

const CategoryList: React.FC = () => {
  const history = useHistory<ITask>();
  const taskState: ITask = history.location.state;
  const [fetchCategories, categories, isLoading] = useFetch(
    FoundRateClient.getCategories()
  );

  useEffect(() => {
    if (!taskState) history.replace(routes.root);
  }, [history, taskState]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Redirection to found rate sub-category list
  const redirectToSubCategories = (category: ICategory) => {
    const state: any = { category, task: taskState }; // TODO: Should be replaced by Context?
    const subCategoryRoute = routes.foundRate.subCategories.replace(
      ':categoryType',
      category.type
    );
    history.replace(subCategoryRoute, state);
  };

  return (
    <IonContent className='ion-padding'>
      {isLoading && <TaskSkeleton cardsNumber={taskState.total} />}
      {categories &&
        categories.map((category: ICategory) => (
          <TaskCard
            key={category.id}
            image={category.image}
            title={category.title}
            onClick={() => redirectToSubCategories(category)}
            total={category.total}
            boxIcon
          />
        ))}
    </IonContent>
  );
};

export default CategoryList;
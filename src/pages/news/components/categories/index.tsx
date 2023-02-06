import { useEffect } from 'react';
import { IonContent } from '@ionic/react';
import { useHistory } from 'react-router';
import useFetch from '../../../../../hooks/useFetch';
import FoundRateClient from '../../../../../clients/FoundRateClient';
import { ITask } from '../../../../../models/ITasks/ITask';
import { IFoundRateData } from '../../../../../models/found-rate/IData';
import { TaskSkeleton } from '../../../../../components/loaders';
import TaskCard from '../../../../../components/task-card';
import { rootRoute, newsRoutes } from '../../../../../routes'; // TODO: Needs to be separated by found-rate directory ?

// Found Rate Category list
const CategoryList: React.FC = () => {
  const history = useHistory<ITask>();
  const taskState: ITask = history.location.state;
  const [fetchData, data, isLoading] = useFetch(
    FoundRateClient.getFoundRateData()
  );

  useEffect(() => {
    if (!taskState) history.replace(rootRoute);
  }, [history, taskState]);

  useEffect(() => {
    fetchData();
  }, []);

  // Redirection to found rate sub-category list
  const redirectToSubCategories = (foundRateData: IFoundRateData) => {
    const state: any = { data: foundRateData, task: taskState }; // TODO: Should be replaced by Context
    const subCategoryRoute = newsRoutes.subCategories.replace(
      ':categoryType',
      foundRateData.category.type
    );
    history.replace(subCategoryRoute, state);
  };

  return (
    <IonContent className='ion-padding'>
      {/* {isLoading && <TaskSkeleton cardsNumber={taskState.total} />} */}
      {data &&
        data.map((record) => (
          <TaskCard
            key={record.category.id}
            image={record.category.image}
            title={record.category.title}
            onClick={() => redirectToSubCategories(record)}
            total={record.total}
            boxIcon
          />
        ))}
    </IonContent>
  );
};

export default CategoryList;

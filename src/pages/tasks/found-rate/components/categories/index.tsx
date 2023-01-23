import { useContext, useEffect } from 'react';
import { IonContent } from '@ionic/react';
import { useHistory } from 'react-router';
import { AppContext, FoundRateContext } from '../../../../../context';
import { useCategory } from '../../../../../hooks';
import FoundRateClient from '../../../../../clients/FoundRateClient';
import { ITask } from '../../../../../models/ITasks/ITask';
import { IFoundRateData } from '../../../../../models/found-rate/IData';
import { TaskSkeleton } from '../../../../../components/loaders';
import TaskCard from '../../../../../components/task-card';
import { rootRoute, foundRateRoutes } from '../../../../../routes'; // TODO: Needs to be separated by found-rate directory ?

// Found Rate Category list
const CategoryList: React.FC = () => {
  const history = useHistory<ITask>();
  const {
    appState: {
      taskState: { selectedTask },
    },
  } = useContext(AppContext);
  const { dispatch } = useContext(FoundRateContext);
  const [fetchData, data, isLoading] = useCategory(
    FoundRateClient.getFoundRateData()
  );

  useEffect(() => {
    if (!selectedTask) history.replace(rootRoute);
  }, [history, selectedTask]);

  useEffect(() => {
    fetchData();
  }, []);

  // Redirection to found rate sub-category list
  const redirectToSubCategories = (foundRateData: IFoundRateData) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: foundRateData });
    const subCategoryRoute = foundRateRoutes.subCategories.replace(
      ':categoryType',
      foundRateData.category.type
    );
    history.replace(subCategoryRoute);
  };

  return (
    <IonContent className='ion-padding'>
      {isLoading && <TaskSkeleton cardsNumber={selectedTask.total} />}
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

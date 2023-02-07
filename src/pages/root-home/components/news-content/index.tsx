import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { IonContent } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import TaskCard from '../../../../components/task-card';
import { ReactComponent as AllDoneImage } from './../../../../assets/media/eye.svg';
import useFetch from '../../../../hooks/useFetch';
import NewsClient from '../../../../clients/NewsClient';
import { TaskSkeleton } from '../../../../components/loaders';
import alarmImage from '../../../../assets/media/task/alarm.svg';
import { ICategory } from '../../../../models/INews/ICategory';
import locales from './locales';

const localize = i18(locales);

const NewsContent = () => {
  const history = useHistory();
  const [fetchNews, categories, loading] = useFetch(NewsClient.getCategories());

  const handleOnClickTask = (category: ICategory) => {
    history.replace({ pathname: category.type, state: category });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <IonContent>
      {loading && <TaskSkeleton cardsNumber={1} />}

      {categories &&
        categories.map((category) => (
          <TaskCard
            key={category.id}
            image={alarmImage}
            title={category.title}
            total={category.total}
            onClick={() => handleOnClickTask(category)}
          ></TaskCard>
        ))}

      {!categories && !loading && (
        <div className='empty-tasks'>
          <AllDoneImage />
          <div>{localize('ALL_IN_ORDER', '')}</div>
        </div>
      )}
    </IonContent>
  );
};

export default NewsContent;

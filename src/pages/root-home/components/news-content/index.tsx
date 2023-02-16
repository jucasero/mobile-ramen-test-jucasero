import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { IonContent } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import CommunicationCard from '../../../../components/communication-card';
import { ReactComponent as AllDoneImage } from './../../../../assets/media/eye.svg';
import useFetch from '../../../../hooks/useFetch';
import NewsClient from '../../../../clients/NewsClient';
import { TaskSkeleton } from '../../../../components/loaders';
import { ICategory } from '../../../../models/INews/ICategory';
import locales from './locales';

import { categoryConfig } from '../../../../utils/news';

const localize = i18(locales);

const NewsContent = () => {
  const history = useHistory();
  const [fetchNews, categories, loading] = useFetch(NewsClient.getCategories());

  const handleOnClickTask = (category: ICategory) => {
    history.replace({
      pathname: category?.type,
      state: { type: category?.type, ...category },
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <IonContent>
      {loading && <TaskSkeleton cardsNumber={1} />}

      {categories &&
        categories.map((category) => (
          <CommunicationCard
            key={category.id}
            image={categoryConfig[category.id].icon}
            title={category.title}
            total={category.total}
            onClick={() => handleOnClickTask(category)}
          ></CommunicationCard>
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

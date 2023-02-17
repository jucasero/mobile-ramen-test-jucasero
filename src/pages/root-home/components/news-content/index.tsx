import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { IonContent } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import CommunicationCard from '../../../../components/communication-card';
import { ReactComponent as AllDoneImage } from './../../../../assets/media/eye.svg';
import useFetch from '../../../../hooks/useFetch';
import NewsClient from '../../../../clients/NewsClient';
import { NewsContext } from '../../../../context';
import { TaskSkeleton } from '../../../../components/loaders';
import { ICategory } from '../../../../models/INews/ICategory';
import locales from './locales';

import { categoryConfig } from '../../../../utils/news';

const localize = i18(locales);

const NewsContent = () => {
  const history = useHistory();
  const { appState, dispatch } = useContext(NewsContext);

  const [fetchCategories, categories, loading] = useFetch(
    NewsClient.getCategories()
  );

  const [fetchNews, news, loadingNews] = useFetch(NewsClient.getNews());

  const handleOnClickTask = (category: ICategory) => {
    history.replace({
      pathname: category?.type,
      state: { type: category?.type, ...category },
    });
  };

  useEffect(() => {
    fetchCategories();
    // if there are not news in the context, fetch them from the API for first time
    if (Object.entries(appState.newsState.news).length === 0) {
      fetchNews();
    }
  }, []);

  useEffect(() => {
    // if there are news from the API, set them in the context
    if (news?.length) {
      dispatch({ type: 'SET_NEWS', payload: news });
    }
  }, [news]);

  return (
    <IonContent>
      {loading && loadingNews && <TaskSkeleton cardsNumber={1} />}

      {categories &&
        categories.map((category) => (
          <CommunicationCard
            key={category.id}
            image={categoryConfig[category.id].icon}
            title={category.title}
            total={appState.newsState.news?.[category.id]?.reduce(
              (acc, communicate) => (!communicate.readed ? acc + 1 : acc),
              0
            )}
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

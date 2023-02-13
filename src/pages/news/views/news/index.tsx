import { useEffect, useContext } from 'react';
import { IonPage, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router';
import { i18 } from '@team_eureka/eureka-ionic-core';
import { NewsProvider } from '../../../../context';
import useFetch from '../../../../hooks/useFetch';
import NewsClient from '../../../../clients/NewsClient';
import { ICategory } from '../../../../models/INews/ICategory';
import CommunicationCard from '../../components/CommunicationCard';
import TaskHeader from '../../components/TaskHeader';
import { TaskSkeleton } from '../../../../components/loaders';
import { NewsContext } from '../../../../context';

import locales from './locales';

import './index.sass';

// All communications for each category
const News: React.FC = () => {
  const localize = i18(locales);
  const history = useHistory<ICategory>();
  const locationState: ICategory = history.location.state;
  const { dispatch } = useContext(NewsContext);

  const [fetchNews, news, loading] = useFetch(
    NewsClient.getNews(locationState?.id)
  );

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOnClickDetail = (detail) => {
    dispatch({ type: 'SET_NEW_READED', payload: true });
    history.replace({ pathname: 'detail/123', state: detail });
  };

  return (
    <NewsProvider>
      <IonPage className='communication-page'>
        <>
          <TaskHeader title={locationState.title} backRoute='/' />

          {loading && <TaskSkeleton cardsNumber={4} />}

          {news && (
            <>
              <IonRow className='communication-flex'>
                <span className='communication-text-unread'>
                  {/* {localize('COMMUNICATIONS_UNREAD', '')} */}
                  Tienes{' '}
                  <span className='communication-display-unread'>
                    {news.filter((detail) => !detail.readed).length} comunicados
                    nuevos{' '}
                  </span>
                  por leer
                </span>

                <IonCol>
                  {/* Communications unread */}
                  {news?.map(
                    (detail) =>
                      !detail.readed && (
                        <CommunicationCard
                          key={detail.id}
                          data={detail}
                          category={locationState?.id}
                          onClick={() => handleOnClickDetail(detail)}
                        />
                      )
                  )}
                </IonCol>
              </IonRow>

              <div className='divider' />

              <IonRow className='communication-flex communication-unread-container'>
                <span className='communication-text-communication-read'>
                  {localize('COMMUNICATIONS_READ', '')}
                </span>

                <IonCol>
                  {/* Communications readed */}
                  {news?.map(
                    (detail) =>
                      detail.readed && (
                        <CommunicationCard
                          key={detail.id}
                          data={detail}
                          category={locationState?.id}
                          onClick={() => handleOnClickDetail(detail)}
                        />
                      )
                  )}
                </IonCol>
              </IonRow>
            </>
          )}
        </>
      </IonPage>
    </NewsProvider>
  );
};

export default News;

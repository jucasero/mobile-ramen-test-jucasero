import React, { useContext, useMemo, useCallback } from 'react';
import { IonPage, IonRow, IonCol } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { i18 } from '@team_eureka/eureka-ionic-core';
import { NewsContext } from '../../../../context';
import { ICategory, INew } from '../../../../models/INews/ICategory';
import CommunicationCard from '../../components/CommunicationCard';
import TaskHeader from '../../components/TaskHeader';

import { rootRoute } from '../../../../routes';
import locales from './locales';

import './index.sass';

interface ICommunicationCardsProps {
  communications: Array<INew>;
  categoryId: string;
  onClick: (detail: INew) => void;
}

const News: React.FC = () => {
  const localize = i18(locales);
  const history = useHistory<ICategory>();
  const { categoryId } = useParams<{ categoryId: string }>();
  const locationState = history.location.state;
  const { appState, dispatch } = useContext(NewsContext);

  const handleOnClickDetail = useCallback(
    (detail) => {
      // TODO: Add method to update communicate as readed
      // NewsClient.updateCommunicateAsRead(detail.id)

      dispatch({
        type: 'SET_NEW_READED',
        payload: { id: detail.id, idCategory: categoryId },
      });

      history.push({
        pathname: `/news/detail/${detail.id}`,
        state: { pathBack: `/news/${categoryId}`, ...detail },
      });
    },
    [appState.newsState.news, categoryId]
  );

  const [unreadCommunications, readCommunications] = useMemo(() => {
    const news = appState.newsState.news?.[categoryId] || [];
    const { read: readCommunications, unread: unreadCommunications } =
      news.reduce(
        (acc, communicate: INew) => {
          const { read, unread } = acc;
          if (communicate.readed) {
            return { read: [...read, communicate], unread };
          } else {
            return { read, unread: [...unread, communicate] };
          }
        },
        { read: [], unread: [] }
      );

    return [unreadCommunications, readCommunications];
  }, [appState.newsState.news]);

  const CommunicationCards = React.memo(function CommunicationCards({
    communications,
    categoryId,
    onClick,
  }: ICommunicationCardsProps) {
    return (
      <>
        {communications.map((detail: INew) => (
          <CommunicationCard
            key={detail.id}
            data={detail}
            category={categoryId}
            onClick={() => onClick(detail)}
          />
        ))}
      </>
    );
  });

  return (
    <IonPage className='communication-page'>
      <>
        <TaskHeader title={locationState.title} backRoute={rootRoute} />

        {appState.newsState.news?.[categoryId] && (
          <div className='communication-container'>
            <IonRow className='communication-flex'>
              <span className='communication-text-unread'>
                {localize('COMMUNICATIONS_HAVE', '')}
              </span>

              <span className='communication-display-unread'>
                {unreadCommunications.length}{' '}
                {localize('COMMUNICATIONS_NEWS', '')}
              </span>

              <span className='communication-text-unread'>
                {localize('COMMUNICATIONS_UNREAD', '')}
              </span>

              <IonCol>
                {/* Communications unread */}
                <CommunicationCards
                  communications={unreadCommunications}
                  categoryId={categoryId}
                  onClick={handleOnClickDetail}
                />
              </IonCol>
            </IonRow>

            <div className='divider' />

            <IonRow className='communication-flex communication-unread-container'>
              <span className='communication-text-communication-read'>
                {localize('COMMUNICATIONS_READ', '')}
              </span>

              <IonCol>
                {/* Communications readed */}
                <CommunicationCards
                  communications={readCommunications}
                  categoryId={categoryId}
                  onClick={handleOnClickDetail}
                />
              </IonCol>
            </IonRow>
          </div>
        )}
      </>
    </IonPage>
  );
};

export default News;

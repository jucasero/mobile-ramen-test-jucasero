import { useEffect } from 'react';
import { IonPage, IonContent, IonIcon, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router';
import { i18 } from '@team_eureka/eureka-ionic-core';
import { NewsProvider } from '../../../../context';
import useFetch from '../../../../hooks/useFetch';
import NewsClient from '../../../../clients/NewsClient';
import { ICategory, INew } from '../../../../models/INews/ICategory';
import CommunicationCard from '../../components/CommunicationCard';
import TaskHeader from '../../components/TaskHeader';
import Button from '../../../../components/button';
// import { TaskSkeleton } from '../../../../components/loaders';

import locales from './locales';

import './index.sass';

// All communications for each category
const DetailNew: React.FC = () => {
  const localize = i18(locales);
  const history = useHistory<ICategory>();
  const locationState: ICategory = history.location.state;

  const redirectExternalLink = () => {
    console.log('');
  };

  return (
    <NewsProvider>
      <IonPage className='communication-page'>
        <>
          <TaskHeader backRoute='/' />

          <div className='detail-new-content'>
            <span className='detail-new-title'>Título del comunicado</span>

            <span className='detail-new-subtitle'>
              Implmentación del planograma
            </span>

            <div className='detail-new-files-content'>
              <Button
                text='archivo.pdf'
                color='light'
                type='secondary'
                onClick={redirectExternalLink}
              />
              <Button
                text='archivo.pdf'
                color='light'
                type='secondary'
                onClick={redirectExternalLink}
              />
              <Button
                text='archivo.pdf'
                color='light'
                type='secondary'
                onClick={redirectExternalLink}
              />
            </div>

            <span className='detail-new-subtitle'>
              {localize('NEW_DETAIL_DESCRIPTION', '')}
            </span>
            <span className='detail-new-description'>
              Lorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem
              ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem
              ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsun
            </span>

            <img />

            <div className='detail-new-no-image'>
              <p>NO FOTO</p>
            </div>

            <Button
              text={localize('NEW_DETAIL_BUTTON', '')}
              color='dark'
              type='primary'
              onClick={redirectExternalLink}
            />
          </div>
        </>
      </IonPage>
    </NewsProvider>
  );
};

export default DetailNew;

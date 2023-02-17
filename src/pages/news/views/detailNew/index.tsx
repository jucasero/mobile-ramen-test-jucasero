import { IonPage, IonImg, IonButton } from '@ionic/react';
import { useHistory } from 'react-router';
import { i18 } from '@team_eureka/eureka-ionic-core';
import { INew } from '../../../../models/INews/ICategory';
import TaskHeader from '../../components/TaskHeader';
import Button from '../../../../components/button';
import downloadImage from '../../../../assets/media/download.svg';
import notFoundImage from '../../../../assets/media/image-not-found-icon.svg';

import { categoryConfig } from '../../../../utils/news';

import locales from './locales';

import './index.sass';

// Detail of a communication
const DetailNew: React.FC = () => {
  const localize = i18(locales);
  const history = useHistory<INew>();
  const locationState: INew = history.location.state;

  const redirectExternalLink = () => {
    window.location.replace(locationState.link);
  };

  const handleDownloadFile = (file: string) => {
    fetch(file).then((response) => {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file;
        a.click();
      });
    });
  };

  return (
    <IonPage className='communication-page'>
      <>
        <TaskHeader backRoute={locationState.pathBack} />

        <div className='detail-new-flex'>
          <div className='detail-new-content'>
            <span className='detail-new-title'>{locationState?.title}</span>

            <span
              className='detail-new-subtitle'
              style={{
                color: categoryConfig[locationState?.idCategory]?.color,
              }}
            >
              {locationState?.subtitle}
            </span>

            <div className='detail-new-files-content'>
              {locationState?.files?.map((file) => (
                <IonButton
                  key={file.id}
                  className='detail-new-files-button'
                  color={'white'}
                  shape='round'
                  onClick={() => {
                    handleDownloadFile(file.name);
                  }}
                >
                  <IonImg
                    src={downloadImage}
                    className='detail-new-no-image-download'
                  />
                  <span className='detail-new-files-text'>{file.name}</span>
                </IonButton>
              ))}
            </div>

            <span className='detail-new-description-title'>
              {localize('NEW_DETAIL_DESCRIPTION', '')}
            </span>
            <span className='detail-new-description'>
              {locationState?.description}
            </span>

            {locationState?.image ? (
              <IonImg src={locationState?.image} className='detail-new-image' />
            ) : (
              <div className='detail-new-no-image'>
                <IonImg
                  src={notFoundImage}
                  className='detail-new-no-image-found'
                />
              </div>
            )}
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
  );
};

export default DetailNew;

import { IonContent, IonPage } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import { IonCol, IonRow, IonGrid, IonThumbnail, IonImg } from '@ionic/react';
import { XImage } from '@ramenx/ui-library';

import './index.sass';

import locales from './locales';
import TaskHeader from '../../components/TaskHeader';
import Cross from '../../../../../assets/media/cross-background.svg';
import Check from '../../../../../assets/media/check-background.svg';

import { mock_products } from '../../../../../mocks/tasks';

export const FoundRateProductDetail: React.FC = () => {
  const localize = i18(locales);

  const product = mock_products[0];

  const RequestedUnits = () => (
    <div className='product-detail--card'>
      <p className='product-detail--text-sm color--light'>
        El shopper solo encontró
      </p>
      <p className='product-detail--text-bg color--light'>
        20 de 45 unidades solicitadas
      </p>
    </div>
  );

  return (
    <IonPage>
      <TaskHeader backRoute='/' section='CornerShop' />

      <IonContent className='ion-padding'>
        <IonCol size='3' className='product-image'>
          <IonThumbnail>
            <IonImg src={product.image} alt={product.description} />
          </IonThumbnail>
        </IonCol>

        <RequestedUnits />

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonRow>
                <span className='product-detail--text-md color--dark'>
                  {localize('article_number', '')}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--text-md color--dark'>
                  {product.brand}
                </span>
              </IonRow>
            </IonCol>

            <IonCol>
              <IonRow>
                <span className='product-detail--text-md color--dark'>
                  {localize('HEADING', '')}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--text-md color--dark'>
                  {product.article_number}
                </span>
              </IonRow>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonRow>
                <span className='product-detail--text-md color--dark'>
                  {localize('BRAND', '')}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--text-md color--dark'>
                  {product.brand}
                </span>
              </IonRow>
            </IonCol>

            <IonCol>
              <IonRow>
                <span className='product-detail--text-md color--dark'>
                  {localize('PROVIDER', '')}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--text-md color--dark'>
                  {product.provider}
                </span>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <div className='product-detail--rack-question'>
        <p className='product-detail--text-bg color--dark'>
          {localize('PRODUCT_RACK_QUESTION', '')}
        </p>
        <XImage src={Check} width='75' />
        <div className='cross'>
          <XImage src={Cross} width='75' />
        </div>
      </div>
    </IonPage>
  );
};

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

import { foundRateRoutes } from '../../../../../routes';

export const FoundRateProductDetail: React.FC = () => {
  const localize = i18(locales);

  const product = mock_products[0];

  const RequestedUnits = () => (
    <div className='product-detail--card'>
      <p className='product-detail--text-sm color--light'>
        {localize('UNITS_REQUESTED_TEXT', '')}
      </p>
      <p className='product-detail--text-bg color--light'>
        {localize('UNITS_REQUESTED_TEXT_2', '')}
      </p>
    </div>
  );

  return (
    <IonPage>
      <TaskHeader
        backRoute={foundRateRoutes.subCategories}
        section='CornerShop'
      />
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol className='product-image' size='3'>
              <IonThumbnail>
                <IonImg src={product.image} alt={product.description} />
              </IonThumbnail>
            </IonCol>

            <IonCol size='6'>
              <IonRow>
                <span className='product-detail--title'>
                  {product.description}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--tag-title'>
                  {localize('PRODUCT_EAN', '')}
                </span>
                <span className='product-detail--tag-title'>{product.ean}</span>
              </IonRow>
              <IonRow>
                <span className='product-detail--tag-title'>
                  {localize('STOCK_NRT', '')}
                </span>
                <span className='product-detail--tag-title'>
                  {product.stock_nrt}
                </span>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>

        <RequestedUnits />

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonRow>
                <span className='product-detail--tag-title'>
                  {localize('ARTICLE', '')}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--tag-description'>
                  {product.article_number}
                </span>
              </IonRow>
            </IonCol>

            <IonCol>
              <IonRow>
                <span className='product-detail--tag-title'>
                  {localize('HEADING', '')}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--tag-description'>
                  {product.article_number}
                </span>
              </IonRow>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonRow>
                <span className='product-detail--tag-title'>
                  {localize('BRAND', '')}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--tag-description'>
                  {product.brand}
                </span>
              </IonRow>
            </IonCol>

            <IonCol>
              <IonRow>
                <span className='product-detail--tag-title'>
                  {localize('PROVIDER', '')}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--tag-description'>
                  {product.provider}
                </span>
              </IonRow>
            </IonCol>
          </IonRow>

          <div className='divider' />

          <IonRow>
            <IonCol>
              <span className='product-detail--tag-title'>
                {localize('LAST_RECEPTION', '')}
              </span>
            </IonCol>
            <IonCol>
              <span className='product-detail--tag-description'>
                {product.last_reception_date}
              </span>
            </IonCol>
          </IonRow>

          <div className='divider' />

          <IonRow>
            <IonCol>
              <IonRow>
                <span className='product-detail--tag-title'>
                  {localize('UNITS_REQUESTED', '')}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--tag-description'>
                  {product.units_requested}
                </span>
              </IonRow>
            </IonCol>

            <IonCol>
              <IonRow>
                <span className='product-detail--tag-title'>
                  {localize('DELIVERY_DATE', '')}
                </span>
              </IonRow>
              <IonRow>
                <span className='product-detail--tag-description'>
                  {product.delivery_date}
                </span>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className='product-detail--rack-question'>
          <span className='product-detail--rack-question__text'>
            {localize('PRODUCT_RACK_QUESTION', '')}
          </span>
          <div className='product-detail--icons'>
            <XImage src={Check} width='75' />
            <XImage src={Cross} width='75' />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

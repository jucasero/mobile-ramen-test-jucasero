import { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import {
  IonCol,
  IonRow,
  IonGrid,
  IonThumbnail,
  IonImg,
  IonIcon,
} from '@ionic/react';

import './index.sass';

import locales from './locales';
import TaskHeader from '../../components/TaskHeader';
import Button from '../../../../../components/button';
import Cross from '../../../../../assets/media/cross-gray.svg';
import Check from '../../../../../assets/media/check-gray.svg';
import CheckBlue from '../../../../../assets/media/check-blue.svg';
import ChevronIcon from '../../../../../assets/media/Chevron';

import { mock_products } from '../../../../../mocks/tasks';

import useShow from '../../../../../hooks/useShow';

export const FoundRateProductDetail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { isShowing, toggle } = useShow();
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

  const handleFinishAlert = () => {
    setLoading(true);
  };

  const ProductInRack = () => (
    <div>
      <div className='product-detail--info'>
        <span className='product-detail--info-title'>
          {localize('INFO_DESCRIPTION', '')}
        </span>
        {['CORRECT_LOCATION', 'CORRECT_CODE', 'CORRECT_BULLET', 'STOCK'].map(
          (name, i) => (
            <span key={i} className='product-detail--info-description'>
              <IonIcon className='product-detail--info-icon' src={CheckBlue} />
              {localize(name, '')}
            </span>
          )
        )}
      </div>

      <Button
        text={localize('PRINT_BUTTON', '')}
        color='light'
        type='primary'
      />

      <Button
        text={localize('FINISH_TASK_BUTTON', '')}
        color='dark'
        type='secondary'
        onClick={handleFinishAlert}
        loading={loading}
      />
    </div>
  );

  const DropDown = () => (
    <div className='dropdown'>
      <div className='dropdown--line' />
      <div
        className={isShowing ? 'dropdown--arrow-active' : 'dropdown--arrow'}
        onClick={toggle}
      >
        <ChevronIcon color={isShowing ? '#FFFFFF' : '#333333'} />
      </div>
      <div className='dropdown--line' />
    </div>
  );

  return (
    <IonPage>
      <TaskHeader section='CornerShop' />
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

        <DropDown />

        {isShowing && (
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
        )}

        <div className='product-detail--rack-question'>
          <span className='product-detail--rack-question__text'>
            {localize('PRODUCT_RACK_QUESTION', '')}
          </span>
          <div className='product-detail--icons'>
            <IonImg src={Check} className='product-detail--check' />
            <IonIcon src={Cross} className='product-detail--cross' />
          </div>
        </div>

        {true && <ProductInRack />}
      </IonContent>
    </IonPage>
  );
};

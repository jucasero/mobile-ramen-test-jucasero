import { useState } from 'react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import {
  IonContent,
  IonPage,
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
import Dropdown from '../../components/dropdown';
import Button from '../../../../../components/button';
import Cross from '../../../../../assets/media/cross-gray.svg';
import Check from '../../../../../assets/media/check-gray.svg';
import CheckBlue from '../../../../../assets/media/check-blue.svg';

import { products } from '../../../../../mocks/found-rate';

import useToggle from '../../../../../hooks/useToggle';

import { useTasks, useTasksDispatch } from '../../../../../context';

export const FoundRateProductDetail: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { isShowing, toggle } = useToggle();

  const tasks = useTasks();

  const localize = i18(locales);

  const product = products[0];

  const handleFinishAlert = () => {
    setLoading(true);
  };

  return (
    <IonPage>
      <TaskHeader section='CornerShop' />
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow className='product-detail--header'>
            <IonCol size='3'>
              <IonThumbnail className='product-image-container'>
                <IonImg
                  className='product-image'
                  src={product.image}
                  alt={product.description}
                />
              </IonThumbnail>
            </IonCol>

            <IonCol size='4'>
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

            <IonCol size='5'>
              <IonRow className='product-detail--location'>
                <span className='product-detail--tag-title'>
                  {product.location}
                </span>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className='product-detail--card'>
          <p className='product-detail--text-sm color--light'>
            {localize('UNITS_REQUESTED_TEXT', '')}
          </p>
          <p className='product-detail--text-bg color--light'>
            {localize('UNITS_REQUESTED_TEXT_2', '')}
          </p>
        </div>

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

        <Dropdown isShowing={isShowing} toggle={toggle} />

        <div className='product-detail--rack-question'>
          <span className='product-detail--rack-question__text'>
            {localize('PRODUCT_RACK_QUESTION', '')}
          </span>
          <div className='product-detail--icons'>
            <IonImg src={Check} className='product-detail--check' />
            <IonIcon src={Cross} className='product-detail--cross' />
          </div>
        </div>

        <div>
          <div className='product-detail--info'>
            <span className='product-detail--info-title'>
              {localize('INFO_DESCRIPTION', '')}
            </span>
            {[
              'CORRECT_LOCATION',
              'CORRECT_CODE',
              'CORRECT_BULLET',
              'STOCK',
            ].map((name, i) => (
              <span key={i} className='product-detail--info-description'>
                <IonIcon
                  className='product-detail--info-icon'
                  src={CheckBlue}
                />
                {localize(name, '')}
              </span>
            ))}
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
      </IonContent>
    </IonPage>
  );
};

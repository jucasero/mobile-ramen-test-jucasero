import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { i18 } from '@team_eureka/eureka-ionic-core';
import {
  IonContent,
  IonPage,
  IonCol,
  IonRow,
  IonGrid,
  IonThumbnail,
  IonImg,
} from '@ionic/react';

import locales from './locales';
import {
  TaskHeader,
  Dropdown,
  NoIsInTheRack,
  IsInTheRack,
  RackQuestionCard,
} from '../../components';
import Button from '../../../../../components/button';
import TouchScreenLock from '../../../../../components/touch-screen-lock';

import cornerShopIcon from '../../../../../assets/media/task/corner-shop.svg';

import useToggle from '../../../../../hooks/useToggle';
import useFetch from '../../../../../hooks/useFetch';
import { rootRoute } from '../../../../../routes';
import FoundRateClient from '../../../../../clients/FoundRateClient';
import './index.sass';
import { IProduct } from '../../../../../models/found-rate/IProduct';

export const FoundRateProductDetail: React.FC = () => {
  const localize = i18(locales);
  const history = useHistory();
  const product = history.location.state as IProduct;
  const [buttonState, setButtonState] = useState({
    text: localize('FINISH_TASK_BUTTON', ''),
    loading: false,
    disabled: false,
  });
  const [isInTheRack, setIsInTheRack] = useState<boolean | null>(null);
  const [radioButtonState, setRadioButtonState] = useState({
    stockStatus: '',
    placeStatus: '',
  });
  const { isShowing, toggle } = useToggle();
  const [postData, data, isLoading] = useFetch(
    FoundRateClient.postFoundRateData()
  );

  const handleFinishAlert = () => {
    postData();
  };

  useEffect(() => {
    if (isLoading && !data) setButtonState({ ...buttonState, loading: true });
    else if (!isLoading && data)
      history.replace({ pathname: rootRoute, state: { isTaskDone: true } });
  }, [isLoading, data]);

  useEffect(() => {
    if (!isInTheRack) {
      if (
        (radioButtonState.stockStatus === 'si' ||
          !radioButtonState.stockStatus) &&
        !radioButtonState.placeStatus
      )
        setButtonState({ ...buttonState, disabled: true, text: 'Finalizar' });
      else
        setButtonState({ ...buttonState, disabled: false, text: 'Finalizar' });
    } else
      setButtonState({
        ...buttonState,
        text: localize('FINISH_TASK_BUTTON', ''),
        disabled: false,
      });
  }, [isInTheRack, radioButtonState]);

  return (
    <IonPage>
      <TaskHeader section='CornerShop' icon={cornerShopIcon} />
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
            {`${product.units_sold} de ${product.units_requested} unidades solicitadas`}
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

        <RackQuestionCard
          isInTheRack={isInTheRack}
          setIsInTheRack={setIsInTheRack}
        />

        {isInTheRack !== null ? (
          isInTheRack ? (
            <IsInTheRack />
          ) : (
            <NoIsInTheRack setRadioButtonState={setRadioButtonState} />
          )
        ) : null}

        {isInTheRack !== null ? (
          <Button
            text={buttonState.text}
            color='dark'
            type='secondary'
            onClick={handleFinishAlert}
            loading={buttonState.loading}
            disabled={buttonState.disabled}
          />
        ) : null}

        <TouchScreenLock activate={buttonState.loading} />
      </IonContent>
    </IonPage>
  );
};
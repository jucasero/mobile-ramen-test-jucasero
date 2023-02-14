import { useContext, useEffect, useState } from 'react';
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

import { AppContext, FoundRateContext } from '../../../../../context';
import { useToggle, useFetch } from '../../../../../hooks';
import { rootRoute, foundRateRoutes } from '../../../../../routes';
import FoundRateClient from '../../../../../clients/FoundRateClient';
import './index.sass';

export const FoundRateProductDetail: React.FC = () => {
  const localize = i18(locales);
  const history = useHistory();
  const {
    foundRateState: { selectedProduct },
  } = useContext(FoundRateContext);
  const { dispatch } = useContext(AppContext);
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
  const [isShowing, toggle] = useToggle();
  const [postData, data, isLoading] = useFetch(
    FoundRateClient.postFoundRateData()
  );

  const handleFinishAlert = () => {
    postData();
  };

  useEffect(() => {
    if (isLoading && !data) setButtonState({ ...buttonState, loading: true });
    else if (!isLoading && data) {
      dispatch({ type: 'SET_TASK_DONE', payload: true });
      history.replace(rootRoute);
    }
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
      <TaskHeader
        section='CornerShop'
        icon={cornerShopIcon}
        backRoute={foundRateRoutes.subCategories}
      />
      <IonContent className='ion-padding'>
        <IonGrid className='product-detail-grid'>
          <IonRow>
            <IonCol className='product-detail-thumbnail' size='auto'>
              <IonThumbnail>
                <IonImg
                  src={selectedProduct.image}
                  alt={selectedProduct.description}
                />
              </IonThumbnail>
            </IonCol>

            <IonCol className='product-detail-descriptions'>
              <IonRow>
                <h6>{selectedProduct.description}</h6>
              </IonRow>
              <IonRow>
                <p>{localize('PRODUCT_EAN', '')}</p>
                <span>{selectedProduct.ean}</span>
              </IonRow>
              <IonRow>
                <p>{localize('STOCK_NRT', '')}</p>
                <span>{selectedProduct.stock_nrt}</span>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow className='product-detail-location'>
            <p>{selectedProduct.location}</p>
          </IonRow>
        </IonGrid>

        <div className='product-detail--card'>
          <p className='product-detail--text-sm color--light'>
            {localize('UNITS_REQUESTED_TEXT', '')}
          </p>
          <p className='product-detail--text-bg color--light'>
            {`${selectedProduct.units_sold} de ${selectedProduct.units_requested} unidades solicitadas`}
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
                    {selectedProduct.article_number}
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
                    {selectedProduct.article_number}
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
                    {selectedProduct.brand}
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
                    {selectedProduct.provider}
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
                  {selectedProduct.last_reception_date}
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
                    {selectedProduct.units_requested}
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
                    {selectedProduct.delivery_date}
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

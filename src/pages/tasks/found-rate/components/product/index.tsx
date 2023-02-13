import React from 'react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import {
  IonItem,
  IonCol,
  IonRow,
  IonThumbnail,
  IonIcon,
  IonImg,
  IonGrid,
  IonChip,
  IonLabel,
} from '@ionic/react';
import { IProduct } from '../../../../../models/found-rate/IProduct';
import shop from '../../../../../assets/media/shop.svg';
import locales from './locales';
import './index.sass';

const localize = i18(locales);

interface IProps {
  product: IProduct;
}

// Product card detail
const Product: React.FC<IProps> = ({ product }) => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol className='thumbnail-column' size='auto'>
          <IonThumbnail>
            <IonImg src={product.image} alt={product.description} />
          </IonThumbnail>
        </IonCol>
        <IonCol>
          <IonRow>
            <h6>{product.description}</h6>
          </IonRow>
          <IonRow>
            <p>{localize('EAN', '')}</p>
            <span>{product.ean}</span>
          </IonRow>
          <IonRow>
            <p>{localize('STOCK_NRT', '')}:</p>
            <span>{product.units_found}</span>
          </IonRow>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonChip>
          <IonIcon icon={shop} />
          <IonLabel color={'light'}>CornerShop</IonLabel>
        </IonChip>
      </IonRow>
    </IonGrid>
  );
};

export default Product;

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
    <div className='product-container'>
      <IonItem className='product-card-item' lines='none'>
        <IonGrid>
          <IonRow>
            <IonCol size='3'>
              <IonThumbnail>
                <IonImg src={product.image} alt={product.description} />
              </IonThumbnail>
            </IonCol>
            <IonCol className='product-detail'>
              <IonRow>
                <div className='product-chip product-chip-icon'>
                  <IonIcon icon={shop} />
                </div>
                <div className='product-chip product-chip-nrt'>
                  <span>{localize('STOCK_NRT', '')}:</span>
                  <span className='product-chip-nrt-value'>
                    {product.units_found}
                  </span>
                </div>
              </IonRow>
              <IonRow>
                <span className='product-title'>{product.description}</span>
              </IonRow>
              <IonRow className='product-ean'>
                <span>{localize('EAN', '')}</span>
                <span className='product-ean-code'>{product.ean}</span>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </div>
  );
};

export default Product;

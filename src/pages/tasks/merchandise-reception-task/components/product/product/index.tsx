import React from 'react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import {
  IonItem,
  IonCol,
  IonRow,
  IonGrid,
  IonThumbnail,
  IonIcon,
  IonImg,
} from '@ionic/react';
import { chevronForwardSharp } from 'ionicons/icons';
import { IProduct } from '../../../../../../models/ITasks/IProduct';
import { getElapsedTime } from '../../../../../../libs/helpers';
import clock from '../../../../../../assets/media/clock.svg';
import locales from '../locales';
import './index.sass';

const localize = i18(locales);

interface IProps {
  product: IProduct;
}

// Product card detail
const Product: React.FC<IProps> = (props) => {
  const { product } = props;

  const renderProductChips = () => {
    const offerings = [
      {
        key: 'no_stock',
        color: '#373737',
        text: localize('NO_STOCK', ''),
      },
      {
        key: 'promotion',
        color: '#5371C4',
        text: localize('PROMOTION', ''),
      },
      {
        key: 'mundo_brio',
        color: '#34C759',
        text: localize('MUNDO_BRIO', ''),
      },
    ];
    const chips = Object.entries(product.product_offer).map(([key, value]) => {
      const productOffer = offerings.find((offer) => offer.key === key);
      if (!value || !productOffer) return null;
      return (
        <span
          key={productOffer.key}
          className='product-task-badge'
          style={{ backgroundColor: productOffer.color }}
        >
          {productOffer.text}
        </span>
      );
    });
    return chips;
  };

  return (
    <div className='product-container'>
      <IonItem
        className='product-task-card'
        detail={true}
        detailIcon={chevronForwardSharp}
        lines='none'
      >
        <IonGrid>
          <IonRow>
            <div className='product-chip-container'>{renderProductChips()}</div>
          </IonRow>
          <div className='divider' />
          <IonRow>
            <IonCol size='3' className='product-image'>
              <IonThumbnail>
                <IonImg src={product.image} alt={product.description} />
              </IonThumbnail>
            </IonCol>
            <IonCol>
              <IonRow>
                <span className='product-title'>{product.description}</span>
              </IonRow>
              <IonRow className='product-tag'>
                <span className='product-measure'>
                  {`${localize('EAN', '')}:`}
                </span>
                <span className='product-ean'>{product.ean}</span>
              </IonRow>
              <IonRow>
                <span className='product-task-badge badge-nrt'>
                  {`${product.units_found} ${localize('STOCK_NRT', '')}`}
                </span>
                <div>
                  <span className='unit-timestamp'>
                    <IonIcon icon={clock} className='clock-icon' />
                    {getElapsedTime(product.last_reception_date).result}
                  </span>
                </div>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </div>
  );
};

export default Product;

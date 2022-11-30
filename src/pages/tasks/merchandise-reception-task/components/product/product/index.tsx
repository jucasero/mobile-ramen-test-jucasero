import React from 'react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import {
  IonItem,
  IonCol,
  IonRow,
  IonGrid,
  IonThumbnail,
  IonIcon,
} from '@ionic/react';
import { chevronForwardSharp } from 'ionicons/icons';
import { IProduct } from '../../../../../../models/IProduct';
import { getElapsedTime } from '../../../../../../libs/helpers';
import yogurt from '../../../../../../assets/image/yogurt.jpeg';
import clock from '../../../../../../assets/media/clock.svg';
import locales from '../locales';
import './index.sass';

const localize = i18(locales);

interface IProps {
  product: IProduct;
}

// Product card detail
const Product: React.FC<IProps> = (props) => {
  const product: IProduct = props.product;
  const badgeColors = {
    // Check from SAP API
    black: '#373737', // No Stock
    purple: '#5371C4', // Promotion
    green: '#34C759', // MundoBio
  };

  return (
    <div className="product-container">
      <IonItem
        className="product-task-card"
        detail={true}
        detailIcon={chevronForwardSharp}
        lines="none"
      >
        <IonGrid>
          <IonRow>
            <div className="product-chip-container">
              {/* Badges, check to get from SAP */}
              <span
                className="product-task-badge"
                style={{ color: badgeColors.black }}
              >
                {localize('NO_STOCK', '')}
              </span>
              <span
                className="product-task-badge"
                style={{ backgroundColor: badgeColors.purple }}
              >
                {localize('PROMOTION', '')}
              </span>
            </div>
          </IonRow>
          <div className="divider" />
          <IonRow>
            <IonCol size="3" className="product-image">
              <IonThumbnail>
                <img src={yogurt} alt={product.description} />
              </IonThumbnail>
            </IonCol>
            <IonCol>
              <IonRow>
                <span className="product-title">{product.description}</span>
              </IonRow>
              <IonRow className="product-tag">
                <span className="product-measure">
                  {`${product.unit_of_meansure}:`}
                </span>
                <span className="product-ean">{product.ean}</span>
              </IonRow>
              <IonRow>
                <span className="product-task-badge badge-nrt">
                  {`${product.stock_nrt} ${localize('STOCK_NRT', '')}`}
                </span>
                <div>
                  <span className="unit-timestamp">
                    <IonIcon icon={clock} className="clock-icon" />
                    {getElapsedTime(Number(product.last_reception_date)).result}
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

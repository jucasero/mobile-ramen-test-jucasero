import { IonIcon } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import Button from '../../../../../components/button';
import locales from '../../views/productDetail/locales';
import CheckBlue from '../../../../../assets/media/check-blue.svg';
import './index.sass';

const IsInTheRack = () => {
  const localize = i18(locales);

  return (
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
    </div>
  );
};

export default IsInTheRack;

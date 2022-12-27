import { IonPage } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
// import locales from './locales';
import Chip from '../../../../../components/chip';

const FoundRateProductDetail: React.FC = () => {
  // const localize = i18(locales);

  return (
    <IonPage>
      <p>Detail screen</p>

      <Chip name='CornerShop' />
    </IonPage>
  );
};

export default FoundRateProductDetail;

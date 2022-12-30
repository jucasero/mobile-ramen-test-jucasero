import { IonPage } from '@ionic/react';
// import { i18 } from '@team_eureka/eureka-ionic-core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';

// import locales from './locales';
import Chip from '../../../../../components/chip';

const FoundRateProductDetail: React.FC = () => {
  // const localize = i18(locales);

  return (
    <IonPage>
      <p>Detail screen</p>

      <Chip name='CornerShop' />
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Card Title</IonCardTitle>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>Text</IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default FoundRateProductDetail;

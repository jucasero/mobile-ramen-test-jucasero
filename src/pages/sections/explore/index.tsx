import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { XHeader, XText } from '@ramenx/ui-library';
import ExploreContainer from '../../../components/ExploreContainer';

import { ReactComponent as LogoConnect } from '../../../assets/img/logo/logo-connect.svg';

import i18n from '@team_eureka/eureka-ionic-core/lib/i18n';
import locales from './locales';

const SectionExplore: React.FC = () => {
  const localize = i18n(locales);
  return (
    <IonPage>
      <IonContent>
        <XHeader
          logo={<LogoConnect />}
          clickNotifications={() => console.log('notifications')}
          clickProfile={() => console.log('profile')}
        />
        <XText level='5' spacing='2' emoji='👋🏼'>
          {localize('EXPLORE_HI', '')}
          {'Alezzi'}
        </XText>

        <ExploreContainer name='Tab 1 page' />
      </IonContent>
      <IonFooter>lla</IonFooter>
    </IonPage>
  );
};

export default SectionExplore;

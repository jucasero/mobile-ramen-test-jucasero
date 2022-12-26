import { IonPage } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import TaskHeader from './components/TaskHeader';
import TaskBody from './components/TaskBody';

import locales from './locales';

const FoundRateAlert: React.FC = () => {
  const localize = i18(locales);

  return (
    <IonPage>
      <TaskHeader title={localize('FILTER_TITLE', '')} />
      <TaskBody />;
    </IonPage>
  );
};

export default FoundRateAlert;

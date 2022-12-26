import { IonPage } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import TaskHeader from './components/task-header';
import TaskBody from './components/task-body';

import locales from './locales';

const MerchandiseReceptionAlert: React.FC = () => {
  const localize = i18(locales);

  return (
    <IonPage>
      <TaskHeader title={localize('TITLE', '')} />
      <TaskBody />;
    </IonPage>
  );
};

export default MerchandiseReceptionAlert;

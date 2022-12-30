import { IonPage } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import TaskHeader from './components/task-header';
import TaskBody from './components/task-body';

import { MerchandiseReceptionProvider } from '../../../context/merchandise-reception';

import locales from './locales';

const MerchandiseReceptionAlert: React.FC = () => {
  const localize = i18(locales);

  return (
    <MerchandiseReceptionProvider>
      <IonPage>
        <TaskHeader title={localize('TITLE', '')} />
        <TaskBody />;
      </IonPage>
    </MerchandiseReceptionProvider>
  );
};

export default MerchandiseReceptionAlert;

import { IonPage } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import { TaskHeader, CategoryList } from '../../components';

import locales from '../../locales';

// Found Rate Category list View
const FoundRateCategories: React.FC = () => {
  const localize = i18(locales);

  return (
    <IonPage>
      <TaskHeader title={localize('FOUND_RATE_ALERT', '')} />
      <CategoryList />
    </IonPage>
  );
};

export default FoundRateCategories;

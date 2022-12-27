import { IonPage } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import TaskHeader from '../../components/TaskHeader';
import CategoryList from '../../components/categories';

import locales from '../../locales';

const FoundRateCategoryList: React.FC = () => {
  const localize = i18(locales);

  return (
    <IonPage>
      <TaskHeader title={localize('FOUND_RATE_ALERT_TITLE', '')} />
      <CategoryList />
    </IonPage>
  );
};

export default FoundRateCategoryList;

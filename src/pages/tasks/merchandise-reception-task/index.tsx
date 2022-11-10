import { IonPage } from "@ionic/react";
import { i18 } from "@team_eureka/eureka-ionic-core";
import TaskBody from "./components/TaskBody";
import TaskHeader from "./components/TaskHeader";

import locales from "./locales";

const MerchandisereceptionAlert: React.FC = () => {
  const localize = i18(locales);

  return (
    <IonPage>
      <TaskHeader title={localize("TITLE", "")} />
      <TaskBody />;
    </IonPage>
  );
};

export default MerchandisereceptionAlert;

import { IonPage } from "@ionic/react";
import { i18 } from "@team_eureka/eureka-ionic-core";
import TaskBody from "./components/TaskBody";
import TaskHeader from "./components/TaskHeader";
import TaskDetail from "./components/TaskDetail";
import TaskProblem from "./components/TaskProblem";

import useModal from "../../../hooks/useModal";

import locales from "./locales";

const MerchandisereceptionAlert: React.FC = () => {
  const localize = i18(locales);
  const { isShowing, toggle } = useModal();

  return (
    <IonPage>
      {/* <TaskHeader title={localize("TITLE", "")} />
      <TaskBody />; */}

      {isShowing && <TaskProblem toggle={toggle} />}
    </IonPage>
  );
};

export default MerchandisereceptionAlert;

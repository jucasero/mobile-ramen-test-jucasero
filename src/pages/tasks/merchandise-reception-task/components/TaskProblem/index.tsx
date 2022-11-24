import { IonContent, IonPage, IonToolbar } from "@ionic/react";
import { i18 } from "@team_eureka/eureka-ionic-core";
import { XButton, XText } from "@ramenx/ui-library";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";

import locales from "../../locales";

import "./index.sass";

interface ITaskProblemProps {
  toggle: () => void;
  // title: string;
}

const TaskProblem: React.FC<ITaskProblemProps> = ({ toggle }) => {
  // const history = useHistory();
  const localize = i18(locales);

  return (
    <IonContent>
      <XText background="black" size="7" weight="bold">
        {localize("PRODUCT_PROBLEM_TITLE", "")}
      </XText>

      <XButton size="xl" text={localize("PRODUCT_PROBLEM_NOT_ARRIVED", "")} />

      <XButton size="xl" text={localize("PRODUCT_PROBLEM_ARRIVED_INCOMPLETED", "")} />

      <XButton text={localize("PRODUCT_PROBLEM_BUTTON", "")} type="primary" background="black" size="xl" onClick={toggle} />
    </IonContent>
  );
};

export default TaskProblem;

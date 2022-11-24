import { IonContent, IonPage, IonToolbar } from "@ionic/react";
import { i18 } from "@team_eureka/eureka-ionic-core";
import { XButton, XText } from "@ramenx/ui-library";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";

import locales from "../../locales";

// import "./index.sass";

interface ITaskDetailProps {
  // title: string;
}

const TaskDetail: React.FC<ITaskDetailProps> = () => {
  // const history = useHistory();
  const localize = i18(locales);

  return (
    <IonContent>
      <XText background="black" size="7" weight="bold">
        {localize("PRODUCT_DETAIL_TITLE", "")}
      </XText>

      {/* TODO: Add product card component */}

      <XButton text={localize("PRODUCT_DETAIL_BUTTON", "")} type="primary" background="black" size="xl" onClick={() => console.log("CLICK")} />

      <XText size="9" align="center" background="black" weight="bold">
        {localize("PRODUCT_DETAIL_LINK", "")}
      </XText>
    </IonContent>
  );
};

export default TaskDetail;

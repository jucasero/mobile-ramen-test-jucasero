import { IonButton, IonHeader, IonIcon, IonToolbar } from "@ionic/react";
import { XText } from "@ramenx/ui-library";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";

import "./index.sass";

interface ITaskHeaderProps {
  title: string;
  backRoute?: string;
  data?: unknown;
}

const TaskHeader: React.FC<ITaskHeaderProps> = ({
  title,
  backRoute = '/',
  data = {},
}) => {
  const history = useHistory();

  return (
    <>
      <IonHeader className="ion-no-border" mode="md">
        <IonToolbar mode="md">
          <IonButton
            fill="clear"
            onClick={() => history.replace(backRoute, data)}
          >
            <IonIcon icon={arrowBack} slot="icon-only" size="large" />
          </IonButton>
          <XText className="ion-padding">
            <h1 style={{ margin: 0, whiteSpace: 'pre-line' }}>{title}</h1>
          </XText>
        </IonToolbar>
      </IonHeader>
      <div className="header-divider" />
    </>
  );
};

export default TaskHeader;

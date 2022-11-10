import { IonImg, IonItem } from "@ionic/react";
import { chevronForwardSharp } from "ionicons/icons";
import { XText } from "@ramenx/ui-library";
import Badge from "../badge";
import defaultImage from "../../assets/media/task/task.svg";
import "./index.sass";

interface ITaskCardProps {
  title: string;
  image: string;
  total: number;
  onClick: () => void;
}

const TaskCard: React.FC<ITaskCardProps> = ({
  title,
  image,
  total,
  onClick,
}) => {
  return (
    <IonItem
      class="task-card"
      onClick={() => onClick()}
      detail={true}
      detailIcon={chevronForwardSharp}
      lines="none"
    >
      <IonImg src={image ?? defaultImage} />
      <XText spacing="2" level="10">
        {title}
      </XText>
      <Badge total={total}></Badge>
    </IonItem>
  );
};

export default TaskCard;

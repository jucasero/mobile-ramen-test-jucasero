import React, { useState } from "react";
import { IonImg, IonItem } from "@ionic/react";
import { chevronForwardSharp } from "ionicons/icons";
import "./index.sass";
import { XText } from "@ramenx/ui-library";
import task from "../../assets/media/task/task.svg";
import { ITask } from "../../models/ITask";
import Badge from "../badge";

interface IProps {
  task: ITask<any>;
  onClick: () => void;
}

const TaskCard: React.FC<IProps> = (props) => {
  const [taskImage, setTaskImage] = useState<any>(task);

  try {
    import(`../../assets/media/task/${props.task.type.toLowerCase()}.svg`).then(
      (image) => setTaskImage(image.default)
    );
  } catch (error) {
    setTaskImage(task);
  }

  const total = props.task.meta_data.total;

  return (
    <IonItem
      class="task-card"
      onClick={() => props.onClick()}
      detail={true}
      detailIcon={chevronForwardSharp}
      lines="none"
    >
      <IonImg src={taskImage} />
      <XText level="10" weight="bold">
        {props.task.title}
      </XText>
      <Badge total={total}></Badge>
    </IonItem>
  );
};

export default TaskCard;

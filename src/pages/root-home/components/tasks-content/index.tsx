import React from "react";
import { useHistory } from "react-router";
import ProgressBar from "react-customizable-progressbar";
import { IonContent } from "@ionic/react";
import { i18 } from "@team_eureka/eureka-ionic-core";
import EmojiIcon from "../../../../components/emoji-icon";
import TaskCard from "../../../../components/task-card";
import { IMerchandiseReceptionMetaData, ITask } from "../../../../models/ITask";
import { ReactComponent as AllDoneImage } from "./../../../../assets/media/eye.svg";
import trackImage from "../../../../assets/media/task/truck.svg";
import locales from "./locales";

const localize = i18(locales);
interface IProps {
  pendingInPercent: any;
}
const TasksContent: React.FC<IProps> = (props) => {
  const history = useHistory();

  const task: ITask<IMerchandiseReceptionMetaData> = {
    id: "2",
    title: "Recepción de mercadería",
    type: "MERCHANDISE-RECEPTION",
    meta_data: {
      products: [
        { id: "20", title: "Lácteos", type: "DAIRY", total: 1 },
        { id: "21", title: "Panificados", type: "BAKED", total: 3 },
        { id: "22", title: "Almacén", type: "WAREHOUSE", total: 2 },
        { id: "23", title: "Vinos", type: "WINES", total: 2 },
        {
          id: "24",
          title: "Mundo bio",
          type: "BIO-WORLD",
          total: 1,
        },
      ],
      total: 5,
    },
  };

  const handleOnClickTask = () => {
    history.replace({
      pathname: `${task.type.toLocaleLowerCase()}`,
      state: task.meta_data,
    });
  };

  return (
    <IonContent>
      <div className="progress-bar">
        <div>
          <div>
            <span />
          </div>
          <div className="progress-text">
            <EmojiIcon emoji={"🎉"} size="small" />
            <div>&nbsp;&nbsp;&nbsp;{localize("NO_PENDING_TASKS", "")}</div>
          </div>
        </div>
        <div>
          <ProgressBar
            progress={props.pendingInPercent}
            radius={100}
            trackStrokeWidth={13}
            trackStrokeColor={"#273432"}
            strokeWidth={15}
            strokeColor={"#8ef46b"}
          />
          <div>{Math.floor(props.pendingInPercent)}%</div>
        </div>
      </div>

      <TaskCard
        image={trackImage}
        title={task.title}
        total={task.meta_data.total}
        onClick={handleOnClickTask}
      ></TaskCard>

      <div className="empty-tasks">
        <AllDoneImage />
        <div>{localize("ALL_IN_ORDER", "")}</div>
      </div>
    </IonContent>
  );
};

export default TasksContent;

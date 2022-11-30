import { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import { useHistory } from "react-router";
import TaskCard from "../../../../../components/task-card";
import bakedImage from "../../../../../assets/media/task/baked.svg";
import { ITask } from "../../../../../models/ITasks/ITask";
import { ICategory } from "../../../../../models/ITasks/ICategory";
import TasksClient from "../../../../../clients/TasksClient";

const TaskBody = () => {
  const history = useHistory<ITask>();
  const locationState = history.location.state;
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getDetailTask = async () => {
    const detailTaskResponse = await TasksClient.getDetailTask(
      locationState.type
    );
    setCategories(detailTaskResponse);
  };

  useEffect(() => {
    if (!locationState) history.replace("/");
  }, [history, locationState]);

  useEffect(() => {
    getDetailTask();
  }, []);

  return (
    <IonContent className="ion-padding">
      {Boolean(categories.length) &&
        categories.map((category: ICategory) => (
          <TaskCard
            key={category.id}
            image={bakedImage}
            title={category.title}
            onClick={() => {}}
            total={category.total}
          />
        ))}
    </IonContent>
  );
};

export default TaskBody;

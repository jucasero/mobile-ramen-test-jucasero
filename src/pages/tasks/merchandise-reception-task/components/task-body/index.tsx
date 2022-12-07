import { useEffect } from "react";
import { IonContent } from "@ionic/react";
import { useHistory } from "react-router";
import TaskCard from "../../../../../components/task-card";
import bakedImage from "../../../../../assets/media/task/baked.svg";
import { ITask } from "../../../../../models/ITasks/ITask";
import { ICategory } from "../../../../../models/ITasks/ICategory";
import TasksClient from "../../../../../clients/TasksClient";
import useFetch from "../../../../../hooks/useFetch";
import CardSkeleton from "../../../../../components/card-skeleton";

const TaskBody = () => {
  const history = useHistory<ITask>();
  const locationState = history.location.state;
  const [fetchCategories, categories, isLoading] = useFetch(
    TasksClient.getDetailTask(locationState?.type)
  );

  useEffect(() => {
    if (!locationState) history.replace("/");
  }, [history, locationState]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonContent className="ion-padding">
      {isLoading && <CardSkeleton numberOfcards={5} />}
      {categories &&
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

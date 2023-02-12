import React, { ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router';
import { IonContent } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import TaskCard from '../../../../components/task-card';
import { ReactComponent as AllDoneImage } from './../../../../assets/media/eye.svg';
import useFetch from '../../../../hooks/useFetch';
import TasksClient from '../../../../clients/TasksClient';
import { TaskSkeleton } from '../../../../components/loaders';
import alarmImage from '../../../../assets/media/task/alarm.svg';
import { ITask } from '../../../../models/ITasks/ITask';
import ProgressCard from '../progress-card';
import locales from './locales';

const localize = i18(locales);

const TasksContent: React.FC = () => {
  const history = useHistory();
  const [fecthTask, tasks, loading] = useFetch(TasksClient.getTasks());

  const handleOnClickTask = (task: ITask) => {
    history.replace({ pathname: task.type, state: task });
  };

  useEffect(() => {
    fecthTask();
  }, []);

  return (
    <IonContent>
      <ProgressCard pendingPercentage={25} />

      <hr />

      {loading && <TaskSkeleton cardsNumber={1} />}

      {tasks &&
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            image={alarmImage}
            title={task.title}
            total={task.total}
            onClick={() => handleOnClickTask(task)}
          ></TaskCard>
        ))}

      {!tasks && !loading && (
        <div className='empty-tasks'>
          <AllDoneImage />
          <div>{localize('ALL_IN_ORDER', '')}</div>
        </div>
      )}
    </IonContent>
  );
};

export default TasksContent;

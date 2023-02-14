import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { IonContent, useIonToast } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import TaskCard from '../../../../components/task-card';
import { rootRoute } from '../../../../routes';
import { AppContext } from '../../../../context';
import { useTask } from '../../../../hooks';
import TasksClient from '../../../../clients/TasksClient';
import { TaskSkeleton } from '../../../../components/loaders';
import ProgressCard from '../progress-card';
import alarmImage from '../../../../assets/media/task/alarm.svg';
import { ITask } from '../../../../models/ITasks/ITask';
import checkIcon from '../../../../assets/media/check.svg';
import { ReactComponent as AllDoneImage } from './../../../../assets/media/eye.svg';
import locales from './locales';

const TasksContent: React.FC = () => {
  const localize = i18(locales);
  const minutesToRefreshTasks = 1;
  const history = useHistory();
  const [present] = useIonToast();
  const [fecthTask, tasks, loading] = useTask(
    TasksClient.getTasks(),
    minutesToRefreshTasks
  );
  const {
    appState: {
      taskState: { isTaskDone },
    },
    dispatch,
  } = useContext(AppContext);

  const handleOnClickTask = (task: ITask) => {
    dispatch({ type: 'SET_SELECTED_TASK', payload: task });
    history.replace(task.type);
  };

  if (isTaskDone && history.location.pathname === rootRoute) {
    present({
      message: localize('ALERT_SUCCESSFULLY_HANDLED', ''),
      duration: 2000,
      cssClass: 'custom-toast',
      icon: checkIcon,
    });
  }

  useEffect(() => {
    fecthTask();
    return () => {
      dispatch({ type: 'SET_TASK_DONE', payload: false });
    };
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

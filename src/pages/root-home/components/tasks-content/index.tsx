import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import ProgressBar from 'react-customizable-progressbar';
import { IonContent, useIonToast } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import EmojiIcon from '../../../../components/emoji-icon';
import TaskCard from '../../../../components/task-card';
import { useTask } from '../../../../hooks';
import TasksClient from '../../../../clients/TasksClient';
import { TaskSkeleton } from '../../../../components/loaders';
import alarmImage from '../../../../assets/media/task/alarm.svg';
import { ITask } from '../../../../models/ITasks/ITask';
import checkIcon from '../../../../assets/media/check.svg';
import { ReactComponent as AllDoneImage } from './../../../../assets/media/eye.svg';
import locales from './locales';

const localize = i18(locales);
interface IProps {
  pendingInPercent: any;
}
const TasksContent: React.FC<IProps> = (props) => {
  const history = useHistory();
  const locationState = history.location.state as { isTaskDone: boolean };
  const [present] = useIonToast();
  const [fecthTask, tasks, loading] = useTask(TasksClient.getTasks(), 1);

  const handleOnClickTask = (task: ITask) => {
    history.replace({ pathname: task.type, state: task });
  };

  if (locationState?.isTaskDone) {
    present({
      message: 'Se ha gestionado la alerta correctamente.',
      duration: 2000,
      cssClass: 'custom-toast',
      icon: checkIcon,
    });
  }

  useEffect(() => {
    fecthTask();
  }, []);

  return (
    <IonContent>
      <div className='progress-bar'>
        <div>
          <div>
            <span />
          </div>
          <div className='progress-text'>
            <EmojiIcon emoji={'🎉'} size='small' />
            <div>&nbsp;&nbsp;&nbsp;{localize('NO_PENDING_TASKS', '')}</div>
          </div>
        </div>
        <div>
          <ProgressBar
            progress={props.pendingInPercent}
            radius={100}
            trackStrokeWidth={13}
            trackStrokeColor={'#273432'}
            strokeWidth={15}
            strokeColor={'#8ef46b'}
          />
          <div>{Math.floor(props.pendingInPercent)}%</div>
        </div>
      </div>
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

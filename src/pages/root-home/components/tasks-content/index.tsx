import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import ProgressBar from 'react-customizable-progressbar';
import { IonContent } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import EmojiIcon from '../../../../components/emoji-icon';
import TaskCard from '../../../../components/task-card';
import { ReactComponent as AllDoneImage } from './../../../../assets/media/eye.svg';
import useFetch from '../../../../hooks/useFetch';
import TasksClient from '../../../../clients/TasksClient';
import { TaskSkeleton } from '../../../../components/loaders';
import alarmImage from '../../../../assets/media/task/alarm.svg';
import { ITask } from '../../../../models/ITasks/ITask';
import locales from './locales';

const localize = i18(locales);
interface IProps {
  pendingInPercent: any;
}
const TasksContent: React.FC<IProps> = (props) => {
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

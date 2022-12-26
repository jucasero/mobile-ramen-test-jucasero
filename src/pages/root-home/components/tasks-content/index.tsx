import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import ProgressBar from 'react-customizable-progressbar';
import { IonContent } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import EmojiIcon from '../../../../components/emoji-icon';
import TaskCard from '../../../../components/task-card';
import { ReactComponent as AllDoneImage } from './../../../../assets/media/eye.svg';
import { routes } from '../../../../routes';
import useFetch from '../../../../hooks/useFetch';
import TasksClient from '../../../../clients/TasksClient';
import CardSkeleton from '../../../../components/card-skeleton';
import alarmImage from '../../../../assets/media/task/alarm.svg';
import locales from './locales';

const localize = i18(locales);
interface IProps {
  pendingInPercent: any;
}
const TasksContent: React.FC<IProps> = (props) => {
  const history = useHistory();
  const [fecthTask, tasks, loading] = useFetch(TasksClient.getTasks());

  const handleOnClickTask = () => {
    history.replace(routes.foundRate.root);
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
      {loading && <CardSkeleton numberOfcards={1} />}

      {tasks &&
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            image={alarmImage}
            title={task.title}
            total={task.total}
            onClick={handleOnClickTask}
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

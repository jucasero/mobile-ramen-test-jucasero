import ProgressBar from 'react-customizable-progressbar';
import { i18 } from '@team_eureka/eureka-ionic-core';
import locales from '../tasks-content/locales';
import './index.sass';

interface IProps {
  pendingPercentage: number;
}

const ProgressCard: React.FC<IProps> = ({ pendingPercentage }) => {
  const localize = i18(locales);

  return (
    <div className='progress-bar-card'>
      <div className='progress-bar-texts'>
        <h3>{localize('TASKS_PROGRESS', '')}</h3>
        <p>{localize('PENDING_TASKS', { pendingTasks: 7 })}</p>
      </div>
      <ProgressBar
        className='progress-bar'
        progress={pendingPercentage}
        radius={100}
        trackStrokeWidth={13}
        trackStrokeColor={'#333333'}
        strokeWidth={15}
        strokeColor={'#8ef46b'}
      >
        <p className='indicator'>{`${pendingPercentage}%`}</p>
      </ProgressBar>
    </div>
  );
};

export default ProgressCard;

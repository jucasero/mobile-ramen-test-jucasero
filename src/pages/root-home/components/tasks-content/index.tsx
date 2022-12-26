import React, { Fragment } from 'react';
import locales from './locales';
import { i18 } from '@team_eureka/eureka-ionic-core';
import { IonContent, IonSkeletonText } from '@ionic/react';
import EmojiIcon from '../../../../components/emoji-icon';
import ProgressBar from 'react-customizable-progressbar';

import { ReactComponent as AllDoneImage } from './../../../../assets/media/eye.svg';

const localize = i18(locales);
interface IProps {
  pendingInPercent: any;
}
const TasksContent: React.FC<IProps> = (props) => {
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
        {/* **** */}
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
        {/* **** */}
      </div>
      {/* EMPTY */}
      {
        <div className='empty-tasks'>
          <AllDoneImage />
          <div>{localize('ALL_IN_ORDER', '')}</div>
        </div>
      }
    </IonContent>
  );
};

export default TasksContent;

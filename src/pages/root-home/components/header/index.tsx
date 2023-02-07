import React from 'react';
import locales from './locales';
import { i18, IJwtEntity } from '@team_eureka/eureka-ionic-core';
import { IonButton, IonHeader, IonToolbar } from '@ionic/react';
import DummyAvatarImage from './../../../../assets/media/dummy-avatar.png';
import { ReactComponent as TaskIcon } from './../../../../assets/media/mdi_task.svg';
import { ReactComponent as TaskIconActive } from './../../../../assets/media/mdi_task_active.svg';
import { ReactComponent as ToolIcon } from './../../../../assets/media/mdi_tools.svg';
import { ReactComponent as ToolIconActive } from './../../../../assets/media/mdi_tools_active.svg';
import EmojiIcon from '../../../../components/emoji-icon';

const localize = i18(locales);

interface IProps {
  user: IJwtEntity;
  onSlideClick: (slider: number) => void;
  activeTasks: boolean;
  activeTools: boolean;
  activeNews: boolean;
  onMenuClick: (toogle: boolean) => void;
}

const Header: React.FC<IProps> = (props) => {
  const showMenuHandler = async () => {
    props.onMenuClick(true);
  };
  const onSlideClickHandler = (slider: number): void => {
    props.onSlideClick(slider);
  };
  return (
    <IonHeader className='ion-no-border'>
      <IonToolbar>
        <div>
          <div></div>
          <div>
            <IonButton fill='clear' onClick={showMenuHandler}>
              <img src={DummyAvatarImage} />
            </IonButton>
          </div>
        </div>
      </IonToolbar>
      <div className='title'>
        <div>{`${localize('WELCOME_TITLE', '')},`}</div>
        {props.user?.unique_name && (
          <div>
            {`${props.user?.unique_name}`}{' '}
            <EmojiIcon emoji='👋🏼' size='medium' />
          </div>
        )}
      </div>
      <div className='lava-buttons'>
        <IonButton
          className={props.activeTasks ? 'white active' : 'white'}
          onClick={() => onSlideClickHandler(0)}
        >
          {props.activeTasks ? <TaskIconActive /> : <TaskIcon />}
          {localize('TASKS', '')}
        </IonButton>
        <IonButton
          className={props.activeNews ? 'white active' : 'white'}
          onClick={() => onSlideClickHandler(1)}
        >
          {props.activeNews ? <TaskIconActive /> : <TaskIcon />}
          {localize('NEWS', '')}
        </IonButton>
        <IonButton
          className={props.activeTools ? 'white active' : 'white'}
          onClick={() => onSlideClickHandler(2)}
        >
          {props.activeTools ? <ToolIconActive /> : <ToolIcon />}
          {localize('TOOLS', '')}
        </IonButton>
      </div>
    </IonHeader>
  );
};

export default Header;

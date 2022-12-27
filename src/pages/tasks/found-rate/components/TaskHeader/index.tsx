import { IonButton, IonHeader, IonIcon, IonToolbar } from '@ionic/react';
import { XText } from '@ramenx/ui-library';
import { arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './index.sass';

interface ITaskHeaderProps {
  title: string;
  backRoute?: string;
  data?: unknown;
  subTitle?: string;
}

const TaskHeader: React.FC<ITaskHeaderProps> = ({
  title,
  backRoute = '/',
  data = {},
  subTitle = null,
}) => {
  const history = useHistory();

  return (
    <IonHeader className='task-header' mode='md'>
      <IonToolbar mode='md'>
        <IonButton
          fill='clear'
          onClick={() => history.replace(backRoute, data)}
        >
          <IonIcon icon={arrowBack} slot='icon-only' size='large'></IonIcon>
        </IonButton>
        {/* // TODO: Replace by XText with size */}
        {subTitle ? (
          <XText className='ion-padding' size={5}>
            <span className='task-header-subtitle'>{subTitle}</span>
          </XText>
        ) : null}
        <p className='ion-padding task-header-title'>{title}</p>
      </IonToolbar>
    </IonHeader>
  );
};

export default TaskHeader;

import {
  IonButton,
  IonChip,
  IonHeader,
  IonIcon,
  IonLabel,
  IonToolbar,
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './index.sass';

interface ITaskHeaderProps {
  title?: string;
  backRoute?: string;
  data?: unknown;
  section?: string;
  icon?: string;
}

const TaskHeader: React.FC<ITaskHeaderProps> = ({
  title,
  backRoute = '/',
  data = {},
  section,
  icon,
}) => {
  const history = useHistory();

  return (
    <IonHeader className='task-header' mode='md'>
      <IonToolbar mode='md'>
        <IonButton
          slot='start'
          fill='clear'
          onClick={() =>
            backRoute ? history.replace(backRoute, data) : history.goBack()
          }
        >
          <IonIcon icon={arrowBack} slot='icon-only' size='large'></IonIcon>
        </IonButton>
        {/* {section && <Chip name={section} icon={icon} />} */}
        {section && (
          <IonChip slot='end'>
            <IonIcon icon={icon} />
            <IonLabel>{section}</IonLabel>
          </IonChip>
        )}
      </IonToolbar>
      {title && <p className='ion-padding task-header-title'>{title}</p>}
    </IonHeader>
  );
};

export default TaskHeader;

import { IonButton, IonHeader, IonIcon, IonToolbar } from '@ionic/react';
import Chip from '../../../../../components/chip';
import { arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './index.sass';

interface ITaskHeaderProps {
  title?: string;
  backRoute?: string;
  data?: unknown;
  section?: string;
  icon?: unknown;
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
          fill='clear'
          onClick={() =>
            backRoute ? history.replace(backRoute, data) : history.goBack()
          }
        >
          <IonIcon icon={arrowBack} slot='icon-only' size='large'></IonIcon>
        </IonButton>

        {section && <Chip name={section} icon={icon} />}
      </IonToolbar>

      {title && <p className='ion-padding task-header-title'>{title}</p>}
    </IonHeader>
  );
};

export default TaskHeader;

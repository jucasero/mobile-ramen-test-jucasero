import { IonImg, IonItem } from '@ionic/react';
import { chevronForwardSharp } from 'ionicons/icons';
import { XText } from '@ramenx/ui-library';
import Badge from '../badge';
import defaultImage from '../../assets/media/task/task.svg';
import './index.sass';

interface ITaskCardProps {
  title: string;
  image: string;
  total: number;
  boxIcon?: boolean;
  onClick: () => void;
}

const TaskCard: React.FC<ITaskCardProps> = ({
  title,
  image,
  total,
  onClick,
  boxIcon,
}) => {
  return (
    <IonItem
      class='task-card'
      onClick={() => onClick()}
      detail={true}
      detailIcon={chevronForwardSharp}
      lines='none'
    >
      <div className={boxIcon ? 'task-box' : ''}>
        <IonImg
          src={image ?? defaultImage}
          className={boxIcon ? 'task-image' : ''}
        />
      </div>
      <XText spacing='2' level='10'>
        {title}
      </XText>
      <Badge total={total}></Badge>
    </IonItem>
  );
};

export default TaskCard;

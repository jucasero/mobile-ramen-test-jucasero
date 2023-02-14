import { IonImg, IonItem } from '@ionic/react';
import { chevronForwardSharp } from 'ionicons/icons';
import Badge from '../badge';
import defaultImage from '../../assets/media/task/task.svg';
import './index.sass';

interface ICommunicationCardProps {
  title: string;
  image: string;
  total: number;
  boxIcon?: boolean;
  onClick: () => void;
}

const CommunicationCard: React.FC<ICommunicationCardProps> = ({
  title,
  image,
  total,
  onClick,
  boxIcon,
}) => {
  return (
    <IonItem
      class='communication-card'
      onClick={() => onClick()}
      detail={true}
      detailIcon={chevronForwardSharp}
      lines='none'
    >
      <div className={boxIcon ? 'communication-box' : ''}>
        <IonImg
          src={image ?? defaultImage}
          className={boxIcon ? 'communication-image' : ''}
        />
      </div>
      {/* TODO: Replace by XText from @ramenx/ui-library */}
      <p className='communication-card-title'>{title}</p>
      <Badge total={total}></Badge>
    </IonItem>
  );
};

export default CommunicationCard;

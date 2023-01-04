import React from 'react';
import { IonChip, IonAvatar, IonLabel, IonIcon } from '@ionic/react';
import './index.sass';

interface IProps {
  name: string;
  icon: any;
}

const Chip: React.FC<IProps> = ({ name, icon }) => {
  return (
    <div className='chip-container'>
      <IonChip className='ion-chip'>
        <IonAvatar>
          <IonIcon icon={icon} slot='icon-only' size='large'></IonIcon>
        </IonAvatar>
        <IonLabel className='ion-label'>{name}</IonLabel>
      </IonChip>
    </div>
  );
};

export default Chip;

import React from 'react';
import { IonChip, IonAvatar, IonLabel, IonIcon } from '@ionic/react';
import './index.sass';

interface IProps {
  name: string;
  icon: any;
}

const Chip: React.FC<IProps> = ({ name, icon }) => {
  return (
    <IonChip className='ion-chip' slot='end'>
      <IonIcon icon={icon} size='large'></IonIcon>
      <IonLabel className='ion-label'>{name}</IonLabel>
    </IonChip>
  );
};

export default Chip;

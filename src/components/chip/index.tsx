import React from 'react';
import { IonChip, IonAvatar, IonLabel } from '@ionic/react';
import './index.sass';

interface IProps {
  name: string;
}

const Chip: React.FC<IProps> = (props) => {
  return (
    <IonChip className='ion-chip'>
      <IonAvatar>
        <img
          alt="Silhouette of a person's head"
          src='https://ionicframework.com/docs/img/demos/avatar.svg'
        />
      </IonAvatar>
      <IonLabel className='ion-label'>{props.name}</IonLabel>
    </IonChip>
  );
};

export default Chip;

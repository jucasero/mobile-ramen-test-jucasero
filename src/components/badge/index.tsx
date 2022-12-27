import { IonBadge } from '@ionic/react';
import React from 'react';
import './index.sass';

interface IProps {
  total: number;
}

const Badge: React.FC<IProps> = (props) => {
  return (
    <IonBadge
      slot='end'
      className={
        props.total > 999 ? 'task-badge badge-text-adjust' : 'task-badge'
      }
    >
      {props.total}
    </IonBadge>
  );
};

export default Badge;

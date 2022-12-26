import './index.sass';
import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
// RAMEN componentes library
import { XImage } from '@ramenx/ui-library';

interface IProps {
  imageSrc?: string;
  title: string;
  subTitle?: string;
  disabled?: boolean;
  onClick: () => void;
}

const ToolCard: React.FC<IProps> = (props) => {
  return (
    <div className='tool-item'>
      <div
        className={`card-image-container ${props.disabled ? 'disabled' : ''}`}
      >
        <XImage
          className={`card-image ${props.disabled ? 'disabled' : ''}`}
          src={props.imageSrc}
          heigh={200}
        />
      </div>
      <div className='titles'>
        <div>
          <div className='tool-name'>{props.title}</div>
          <div className='legend'>{props.subTitle}</div>
        </div>
        <IonButton
          size='large'
          shape='round'
          color='light'
          disabled={props.disabled}
          onClick={() => props.onClick()}
        >
          <IonIcon slot='icon-only' icon={chevronForwardOutline} />
        </IonButton>
      </div>
    </div>
  );
};

export default ToolCard;

import React from 'react';
import { IonAccordionGroup, IonAccordion, IonItem } from '@ionic/react';
import { XText } from '@ramenx/ui-library';
import Badge from '../badge';
import './index.sass';

interface IAccordionOptionProps {
  title: string;
  total: number;
  children: any;
}

const AccordionOption: React.FC<IAccordionOptionProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <IonAccordionGroup expand='compact'>
      <IonAccordion value='first' className='task-accordion'>
        <IonItem slot='header' lines='none'>
          <XText spacing='2' level='10'>
            {title}
          </XText>
          <Badge total={total}></Badge>
        </IonItem>
        <div className='ion-padding' slot='content'>
          {children}
        </div>
      </IonAccordion>
    </IonAccordionGroup>
  );
};

export default AccordionOption;

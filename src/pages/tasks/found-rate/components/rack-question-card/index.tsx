import { IonImg } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import locales from '../../views/product-detail/locales';
import checkIcon from '../../../../../assets/media/task/check.svg';
import checkedIcon from '../../../../../assets/media/task/checked.svg';
import crossIcon from '../../../../../assets/media/task/cross.svg';
import crossSelectedIcon from '../../../../../assets/media/task/cross-selected.svg';
import PlainCard from '../../../../../components/plain-card';
import './index.sass';

interface IProps {
  isInTheRack: boolean | null;
  setIsInTheRack: React.Dispatch<React.SetStateAction<boolean>>;
}

const RackQuestionCard: React.FC<IProps> = ({
  isInTheRack,
  setIsInTheRack,
}) => {
  const localize = i18(locales);

  return (
    <PlainCard className='question-card-container'>
      <p className='question-card-title'>
        {localize('PRODUCT_RACK_QUESTION', '')}
      </p>
      <IonImg
        src={isInTheRack ? checkedIcon : checkIcon}
        onClick={() => setIsInTheRack(true)}
      />
      <IonImg
        src={
          isInTheRack !== null && !isInTheRack ? crossSelectedIcon : crossIcon
        }
        onClick={() => setIsInTheRack(false)}
      />
    </PlainCard>
  );
};

export default RackQuestionCard;

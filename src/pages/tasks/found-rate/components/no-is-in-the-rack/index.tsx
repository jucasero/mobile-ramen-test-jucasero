import { useEffect, useState } from 'react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import locales from '../../views/product-detail/locales';
import PlainCard from '../../../../../components/plain-card';
import RadioButton from '../../../../../components/radio-button';
import './index.sass';

interface IProps {
  setRadioButtonState: React.Dispatch<
    React.SetStateAction<{ stockStatus: string; placeStatus: string }>
  >;
}

const NoIsInTheRack: React.FC<IProps> = ({ setRadioButtonState }) => {
  const localize = i18(locales);
  const [stockStatus, setStockStatus] = useState('');
  const [placeStatus, setPlaceStatus] = useState('');

  useEffect(() => {
    setRadioButtonState({ stockStatus, placeStatus });
  }, [stockStatus, placeStatus]);

  return (
    <PlainCard>
      <p className='card-title'>{localize('STOCK_RACK_QUESTION', '')}</p>
      <RadioButton
        label={localize('STOCK_RACK_AFFIRMATIVE', '')}
        value='si'
        onChange={() => setStockStatus('si')}
        checked={stockStatus === 'si'}
      />
      <RadioButton
        label={localize('STOCK_RACK_NEGATIVE', '')}
        value='no'
        onChange={() => setStockStatus('no')}
        checked={stockStatus === 'no'}
      />
      {stockStatus === 'si' ? (
        <>
          <p className='card-subtitle'>{localize('PLACE_RACK_QUESTION', '')}</p>
          <RadioButton
            label={localize('PLACE_RACK_AFFIRMATIVE', '')}
            value='altillo'
            onChange={() => setPlaceStatus('altillo')}
            checked={placeStatus === 'altillo'}
          />
          <RadioButton
            label={localize('PLACE_RACK_NEGATIVE', '')}
            value='bodega'
            onChange={() => setPlaceStatus('bodega')}
            checked={placeStatus === 'bodega'}
          />
        </>
      ) : null}
    </PlainCard>
  );
};

export default NoIsInTheRack;

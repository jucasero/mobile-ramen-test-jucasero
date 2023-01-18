import { useEffect, useState } from 'react';
import PlainCard from '../../../../../components/plain-card';
import RadioButton from '../../../../../components/radio-button';
import './index.sass';

interface IProps {
  setRadioButtonState: React.Dispatch<
    React.SetStateAction<{ stockStatus: string; placeStatus: string }>
  >;
}

const NoIsInTheRack: React.FC<IProps> = ({ setRadioButtonState }) => {
  const [stockStatus, setStockStatus] = useState('');
  const [placeStatus, setPlaceStatus] = useState('');

  useEffect(() => {
    setRadioButtonState({ stockStatus, placeStatus });
  }, [stockStatus, placeStatus]);

  return (
    <PlainCard>
      <p className='card-title'>¿Existe stock en bodega/cámara para reponer?</p>
      <RadioButton
        label='Sí, reponer'
        value='si'
        onChange={() => setStockStatus('si')}
        checked={stockStatus === 'si'}
      />
      <RadioButton
        label='No'
        value='no'
        onChange={() => setStockStatus('no')}
        checked={stockStatus === 'no'}
      />
      {stockStatus === 'si' ? (
        <>
          <p className='card-subtitle'>¿Dónde lo encontraste?</p>
          <RadioButton
            label='Reposición desde altillo'
            value='altillo'
            onChange={() => setPlaceStatus('altillo')}
            checked={placeStatus === 'altillo'}
          />
          <RadioButton
            label='Reposición desde bodega'
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

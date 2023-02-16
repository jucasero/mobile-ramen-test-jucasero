import { INew } from '../../../../models/INews/ICategory';
import './index.sass';

import { categoryConfig } from '../../../../utils/news';

interface ICommunicationCardProps {
  data: INew;
  category: string;
  onClick: () => void;
}

const CommunicationCard: React.FC<ICommunicationCardProps> = ({
  data,
  category,
  onClick,
}) => {
  return (
    <div className='communication-card-container' onClick={() => onClick()}>
      <div
        className='communication-card-color'
        style={{ borderColor: categoryConfig[category]?.color }}
      >
        <span className='communication-card-title'>
          {(data?.title).substring(0, 30)}...
        </span>
        <div className='communication-card-footer'>
          <span className='communication-card-description'>
            {(data?.description).substring(0, 100)}...
          </span>
          <span className='communication-card-arrow'>{'>'}</span>
        </div>
        <div className='communication-card-footer'>
          <span className='communication-card-date'>{data?.date}</span>
          <span
            className='communication-card-subtitle'
            style={{ color: categoryConfig[category]?.color }}
          >
            {(data?.subtitle).substring(0, 20)}...
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunicationCard;

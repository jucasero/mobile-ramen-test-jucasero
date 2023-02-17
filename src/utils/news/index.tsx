import categoryImage from '../../assets/media/category.svg';
import commercialImage from '../../assets/media/commercial.svg';
import logisticImage from '../../assets/media/logistic.svg';
import offerImage from '../../assets/media/offer.svg';

interface ICategoryConfig {
  [key: string]: {
    color: string;
    icon: string;
  };
}

export const categoryConfig: ICategoryConfig = {
  '1': {
    color: '#DA995D',
    icon: categoryImage,
  },
  '2': {
    color: '#7C7AE3',
    icon: commercialImage,
  },
  '3': {
    color: '#5DB5DA',
    icon: offerImage,
  },
  '4': {
    color: '#2FCD9B',
    icon: logisticImage,
  },
};

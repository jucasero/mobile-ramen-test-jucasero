import { useContext } from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router';
import { FoundRateContext } from '../../../../../context';
import { IDetailData } from '../../../../../models/found-rate/IData';
import { TaskHeader, Product } from '../../components';
import AccordionOption from '../../../../../components/accordion-option';
import { foundRateRoutes } from '../../../../../routes';
import location from '../../../../../assets/media/location.svg';
import './index.sass';

// Found Rate Sub-Category list
const SubCategories: React.FC = () => {
  const history = useHistory();
  const {
    foundRateState: {
      selectedCategory: { category, detail },
    },
    dispatch,
  } = useContext(FoundRateContext);

  const handleOnClickProduct = (product) => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    history.replace(foundRateRoutes.productDetail);
  };

  return (
    <>
      <TaskHeader title={category.title} backRoute={foundRateRoutes.root} />
      <IonContent className='ion-padding'>
        {detail.map((detail: IDetailData) => (
          <AccordionOption
            key={detail.subCategory.id}
            title={detail.subCategory.title}
            total={detail.total}
          >
            {detail.products.map((product) => (
              <Product
                key={product.id}
                product={product}
                onClick={() => handleOnClickProduct(product)}
              />
            ))}
            <div className='sub-category-footer  '>
              <IonIcon icon={location} />
              <span>{detail.marketArea}</span>
            </div>
          </AccordionOption>
        ))}
      </IonContent>
    </>
  );
};

export default SubCategories;

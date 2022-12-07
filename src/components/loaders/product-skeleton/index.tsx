import { Fragment } from 'react';
import {
  IonSkeletonText,
  IonListHeader,
  IonItem,
  IonThumbnail,
  IonLabel,
} from '@ionic/react';
import './index.sass';

interface IProps {
  qtyProducts?: number;
}

// Loader Skeleton Product
const ProductSkeleton: React.FC<IProps> = (props) => {
  const { qtyProducts } = props;

  // Render skeleton elements
  const skeletonProdComponent = (key: string) => (
    <Fragment key={key}>
      <IonListHeader>
        <IonSkeletonText animated={true} />
      </IonListHeader>
      <IonItem lines="none">
        <IonThumbnail slot="start">
          <IonSkeletonText animated={true} />
        </IonThumbnail>
        <IonLabel>
          <h3>
            <IonSkeletonText animated={true} />
          </h3>
          <p>
            <IonSkeletonText animated={true} />
          </p>
          <p>
            <IonSkeletonText animated={true} />
          </p>
        </IonLabel>
      </IonItem>
    </Fragment>
  );

  // Rendering skeleton elements by qtyProducts
  const renderSkeletonProducts = () => {
    const elements = Array.from({ length: qtyProducts || 1 });
    return elements.map((_, index) => {
      return skeletonProdComponent(`skeleton-${index}`);
    });
  };

  return <Fragment>{renderSkeletonProducts()}</Fragment>;
};

export default ProductSkeleton;

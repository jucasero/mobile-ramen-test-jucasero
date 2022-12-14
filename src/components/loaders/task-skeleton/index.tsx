import { Fragment } from 'react';
import {
  IonSkeletonText,
  IonListHeader,
  IonItem,
  IonThumbnail,
  IonLabel,
} from '@ionic/react';
import '../index.sass';

interface IProps {
  cardsNumber?: number;
}

// Loader Skeleton Tasks
const TaskSkeleton: React.FC<IProps> = (props) => {
  const { cardsNumber } = props;

  // Render skeleton elements
  const skeletonComponent = (key: string) => (
    <Fragment key={key}>
      <IonListHeader />
      <IonItem lines="none">
        <IonThumbnail slot="start">
          <IonSkeletonText animated={true} />
        </IonThumbnail>
        <IonLabel style={{ width: '80%' }}>
          <p>
            <IonSkeletonText animated={true} />
          </p>
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

  // Rendering skeleton elements by cardsNumber
  const renderSkeletonComponent = () => {
    const elements = Array.from({ length: cardsNumber || 1 });
    return elements.map((_, index) => {
      return skeletonComponent(`skeleton-${index}`);
    });
  };

  return <Fragment>{renderSkeletonComponent()}</Fragment>;
};

export default TaskSkeleton;

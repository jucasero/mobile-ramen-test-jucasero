import { useEffect } from 'react';
import { IonContent } from '@ionic/react';
import { useHistory } from 'react-router';
import TaskCard from '../../../../../components/task-card';
import bakedImage from '../../../../../assets/media/task/baked.svg';
import { IProduct } from '../../../../../models/ITask';
import { routes } from '../../constants';

const TaskBody = () => {
  const history = useHistory<History>();
  const locationState = history.location.state as any;
  const products = locationState?.products || [];

  useEffect(() => {
    if (!history.location.state) history.replace('/');
  }, [history]);

  // Redirection to merchandise reception products list
  const onProductCategory = (productCategory: IProduct) => {
    const state: any = { productCategory, products };
    history.replace(
      `${routes.productCategory.replace(
        ':productCategory',
        productCategory.type.toLocaleLowerCase()
      )}`,
      state
    );
  };

  return (
    <IonContent className="ion-padding">
      {products &&
        products.map((product: any) => (
          <TaskCard
            key={product.id}
            image={bakedImage}
            title={product.title}
            onClick={() => {
              onProductCategory(product);
            }}
            total={product.total}
          />
        ))}
    </IonContent>
  );
};

export default TaskBody;

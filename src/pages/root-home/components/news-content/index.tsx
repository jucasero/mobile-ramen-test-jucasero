import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { IonContent } from '@ionic/react';
import { i18 } from '@team_eureka/eureka-ionic-core';
import TaskCard from '../../../../components/task-card';
import { ReactComponent as AllDoneImage } from './../../../../assets/media/eye.svg';
import useFetch from '../../../../hooks/useFetch';
import NewsClient from '../../../../clients/NewsClient';
import { TaskSkeleton } from '../../../../components/loaders';
import { ICategory } from '../../../../models/INews/ICategory';
import locales from './locales';

import categoryImage from '../../../../assets/media/category.svg';
import commercialImage from '../../../../assets/media/commercial.svg';
import logisticImage from '../../../../assets/media/logistic.svg';
import offerImage from '../../../../assets/media/offer.svg';

const imageByCategory = {
  '1': categoryImage,
  '2': commercialImage,
  '3': offerImage,
  '4': logisticImage,
};

const localize = i18(locales);

const NewsContent = () => {
  const history = useHistory();
  const [fetchNews, categories, loading] = useFetch(NewsClient.getCategories());

  const handleOnClickTask = (category: ICategory) => {
    history.replace({ pathname: category.type, state: category });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <IonContent>
      {loading && <TaskSkeleton cardsNumber={1} />}

      {categories &&
        categories.map((category) => (
          <TaskCard
            key={category.id}
            image={imageByCategory[category.id]} // TODO: change image
            title={category.title}
            total={category.total}
            onClick={() => handleOnClickTask(category)}
          ></TaskCard>
        ))}

      {!categories && !loading && (
        <div className='empty-tasks'>
          <AllDoneImage />
          <div>{localize('ALL_IN_ORDER', '')}</div>
        </div>
      )}
    </IonContent>
  );
};

export default NewsContent;

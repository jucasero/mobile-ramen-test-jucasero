import { useEffect } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router';
import SubCategories from '../../components/sub-categories';
import { NewsProvider } from '../../../../context';
import useFetch from '../../../../hooks/useFetch';
import NewsClient from '../../../../clients/NewsClient';

// All news for each category
const News: React.FC = () => {
  // const history = useHistory<ILocationState>();
  // const locationState: ILocationState = history.location.state;

  const [fetchNews, news, loading] = useFetch(NewsClient.getNews('2'));

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <NewsProvider>
      <IonPage>
        <SubCategories />
      </IonPage>
    </NewsProvider>
  );
};

export default News;

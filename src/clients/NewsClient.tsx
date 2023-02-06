import { RESTClient } from '@team_eureka/eureka-ionic-core';
import WithBootedClient from '../libs/WithBootedClient';
import { news } from '../mocks/news';
import { apiCallMock } from '../mocks/utils';

class NewsClient extends RESTClient implements WithBootedClient {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async boot() {}

  async getNews() {
    const apiCall = apiCallMock(news);
    const response = await apiCall;
    return response;
  }
}

export default new NewsClient({
  baseURL: process.env.REACT_APP_API!,
});

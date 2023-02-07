import { RESTClient } from '@team_eureka/eureka-ionic-core';
import WithBootedClient from '../libs/WithBootedClient';
import { categories, news } from '../mocks/news';
import { apiCallMock } from '../mocks/utils';
import { ICategory, INew } from '../models/INews/ICategory';

class NewsClient extends RESTClient implements WithBootedClient {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async boot() {}

  async getCategories(): Promise<ICategory[]> {
    const response = await apiCallMock(categories);
    return response;
  }

  async getNews(category: string): Promise<INew[]> {
    const apiCall = apiCallMock(news);

    const response = await apiCall;

    // filter news by ID category
    const filtered = response.filter(
      ({ idCategory }) => idCategory === category
    );

    return filtered;
  }
}

export default new NewsClient({
  baseURL: process.env.REACT_APP_API!,
});

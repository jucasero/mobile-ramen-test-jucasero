import { RESTClient } from '@team_eureka/eureka-ionic-core';
import WithBootedClient from '../libs/WithBootedClient';
import {
  categories,
  news,
  responseUpdateCommunicateAsRead,
} from '../mocks/news';
import { apiCallMock } from '../mocks/utils';
import { ICategory, INew } from '../models/INews/ICategory';

class NewsClient extends RESTClient implements WithBootedClient {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async boot() {}

  async getCategories(): Promise<ICategory[]> {
    const response = await apiCallMock(categories);
    return response;
  }

  async getNews(): Promise<INew[]> {
    const response = await apiCallMock(news);
    return response;
  }

  // Replace to API to update communicate as read
  async updateCommunicateAsRead(communicationId: string) {
    const response = await apiCallMock(
      responseUpdateCommunicateAsRead(communicationId)
    );
    return response;
  }
}

export default new NewsClient({
  baseURL: process.env.REACT_APP_API!,
});

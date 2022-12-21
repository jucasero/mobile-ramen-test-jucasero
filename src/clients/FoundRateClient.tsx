import { RESTClient } from '@team_eureka/eureka-ionic-core';
import WithBootedClient from '../libs/WithBootedClient';
import { ICategory } from '../models/found-rate/ICategory';
import { categories } from '../mocks/found-rate';
import { apiCallMock } from '../mocks/utils';

class FoundRateClient extends RESTClient implements WithBootedClient {
  async boot() {}

  async getCategories(): Promise<ICategory[]> {
    const response = await apiCallMock(categories);
    return response;
  }
}

export default new FoundRateClient({
  baseURL: process.env.REACT_APP_API_ENDPOINT!,
});

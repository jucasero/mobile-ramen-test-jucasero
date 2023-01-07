import { RESTClient } from '@team_eureka/eureka-ionic-core';
import WithBootedClient from '../libs/WithBootedClient';
import { ICategory } from '../models/found-rate/ICategory';
import { IFoundRateData } from '../models/found-rate/IData';
import { categories, buildMockData } from '../mocks/found-rate';
import { apiCallMock } from '../mocks/utils';

class FoundRateClient extends RESTClient implements WithBootedClient {
  async boot() {
    /* Do something */
  }

  async getCategories(): Promise<ICategory[]> {
    const response = await apiCallMock(categories);
    return response;
  }

  async getFoundRateData(): Promise<IFoundRateData[]> {
    const mockData = buildMockData();
    const response = await apiCallMock(mockData);
    return response;
  }
}

export default new FoundRateClient({
  baseURL: process.env.REACT_APP_API_ENDPOINT!,
});

import { RESTClient } from '@team_eureka/eureka-ionic-core';
import WithBootedClient from '../libs/WithBootedClient';
import { tasks } from '../mocks/tasks';
import { apiCallMock } from '../mocks/utils';

class TasksClient extends RESTClient implements WithBootedClient {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async boot() {}

  async getTasks() {
    const apiCall = apiCallMock(tasks);
    const response = await apiCall;
    return response;
  }
}

export default new TasksClient({
  baseURL: process.env.REACT_APP_API!,
});

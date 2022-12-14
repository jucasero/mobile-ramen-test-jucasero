import { RESTClient } from '@team_eureka/eureka-ionic-core';
import WithBootedClient from '../libs/WithBootedClient';
import { ITask } from '../models/ITasks/ITask';

class TasksClient extends RESTClient implements WithBootedClient {
  async boot() {}

  async getTasks() {
    const apiCall = new Promise<ITask[]>((resolve) =>
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Recepción de mercadería',
            type: 'merchandise-reception',
            total: 7,
          },
        ]);
      }, 500)
    );
    const response = await apiCall;
    return response;
  }
}

export default new TasksClient({
  baseURL: process.env.REACT_APP_API!,
});

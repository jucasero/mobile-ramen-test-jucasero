import { RESTClient } from "@team_eureka/eureka-ionic-core";
import WithBootedClient from "../libs/WithBootedClient";
import { ICategory } from "../models/ITasks/ICategory";
import { ITask } from "../models/ITasks/ITask";

class TasksClient extends RESTClient implements WithBootedClient {
  async boot() {}

  async getTasks() {
    const apiCall = new Promise<ITask[]>((resolve) =>
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "Recepción de mercadería",
            type: "merchandise-reception",
            total: 5,
          },
        ]);
      }, 500)
    );
    const response = await apiCall;
    return response;
  }

  async getDetailTask(taskType: string) {
    //apiCall use taskType
    const apiCall = new Promise<ICategory[]>((resolve) =>
      setTimeout(() => {
        resolve([
          { id: "20", title: "Lácteos", type: "dairy", total: 1 },
          { id: "21", title: "Panificados", type: "baked", total: 3 },
          { id: "22", title: "Almacén", type: "warehouse", total: 2 },
          { id: "23", title: "Vinos", type: "wines", total: 2 },
          {
            id: "24",
            title: "Mundo bio",
            type: "bio-world",
            total: 1,
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

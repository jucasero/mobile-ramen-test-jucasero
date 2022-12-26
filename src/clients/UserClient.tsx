import WithBootedClient from '../libs/WithBootedClient';
import { IJwt, RESTClient, XConsole } from '@team_eureka/eureka-ionic-core';
import axios from 'axios';
import { IUser } from '../models/users/IUser';

const cencosudx = XConsole({ label: 'user-client' });

interface IConfig {
  baseURL: string;
}

class UserClient extends RESTClient implements WithBootedClient {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async boot() {}

  async meWithJwt(jwt: IJwt): Promise<IUser> {
    const response = await axios.get(`${this.baseUrl}/users/me/info`, {
      headers: {
        Authorization: `${jwt.token_type.toLowerCase()} ${jwt.access_token}`,
      },
    });

    if (response.status !== 200) {
      throw {
        data: response.data,
        response: { status: response.status },
      };
    }
    return response.data;
  }

  async register(data: IUser, jwt: IJwt): Promise<IUser> {
    const response = await axios.post(`${this.baseUrl}/users`, data, {
      headers: {
        Authorization: `${jwt.token_type.toLowerCase()} ${jwt.access_token}`,
      },
    });
    return response.data;
  }
  async getById(userId: string) {
    const response = await this.axios.get(`/users/${userId}`);
    return response.data;
  }
  async updateNotificationTokenWithJwt(
    device_token: string,
    jwt: IJwt
  ): Promise<void> {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_ENDPOINT}/users/me`,
      { device_token },
      {
        headers: {
          Authorization: `${jwt.token_type.toLowerCase()} ${jwt.access_token}`,
        },
      }
    );
    return response.data;
  }

  async me(): Promise<IUser> {
    const response = await this.axios.get('/users/me/info');
    return response.data;
  }
}

export default new UserClient({
  baseURL: process.env.REACT_APP_API_ENDPOINT!,
});

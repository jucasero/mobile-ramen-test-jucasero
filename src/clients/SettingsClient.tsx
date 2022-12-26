import { Storage } from '@capacitor/storage';
import WithBootedClient from '../libs/WithBootedClient';

const storageName = '@settings';
interface IState {
  [key: string]: any;
}

enum SETTINGS_ENUM {
  'LANGUAGE',
  'FIRST_TIME',
  'PUSH_TOKEN',
}
export type SettingTypes = keyof typeof SETTINGS_ENUM;

class SettingsClient extends WithBootedClient {
  state: IState = {};

  async boot() {
    const cached = await Storage.get({ key: storageName });
    if (cached && cached.value) {
      const newState = JSON.parse(cached.value);
      this.setState(newState);
    }
  }

  get(name: SettingTypes, defaultValue: any = null) {
    const setting = this.state[name];
    if (typeof setting == 'undefined') {
      return defaultValue;
    }

    return setting;
  }

  async set(name: SettingTypes, value: any) {
    this.state[name] = value;

    await this.setState(this.state);

    await Storage.set({
      key: storageName,
      value: JSON.stringify(this.state),
    });
    return value;
  }

  async remove(name: SettingTypes) {
    delete this.state[name];

    await this.setState(this.state);

    await Storage.set({
      key: storageName,
      value: JSON.stringify(this.state),
    });
    return true;
  }

  private async setState(newState: IState): Promise<void> {
    this.state = newState;
  }
}

export default new SettingsClient();

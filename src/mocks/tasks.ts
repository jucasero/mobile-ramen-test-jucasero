import { ITask } from '../models/ITasks/ITask';
import { foundRateAlertDataDB } from './found-rate';

export const tasks: ITask[] = [
  {
    id: '2',
    title: 'Alerta de Found Rate',
    type: 'found-rate',
    total: foundRateAlertDataDB.length,
  },
];

import { IAppState } from '..';
import { ITask } from '../../../models/ITasks/ITask';

export interface ITaskState {
  tasks: ITask[];
  lastApiCall: Date | null;
}

export type TaskAction = { type: 'SET_TASKS'; payload: ITask[] };

export const taskReducer = (
  state: ITaskState,
  action: TaskAction
): ITaskState => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        lastApiCall: new Date(),
      };
    default:
      return state;
  }
};

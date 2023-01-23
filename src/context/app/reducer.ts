import { IInitialState } from '.';
import { ITask } from '../../models/ITasks/ITask';

export type TaskAction = { type: 'SET_TASKS'; payload: ITask[] };

export const taskReducer = (
  state: IInitialState,
  action: TaskAction
): IInitialState => {
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

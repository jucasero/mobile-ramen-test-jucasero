import { IInitialState } from '.';
import { ITask } from '../../models/ITasks/ITask';

export type TaskAction = { type: 'ADD_TASK'; payload: ITask };

export const taskReducer = (
  state: IInitialState,
  action: TaskAction
): IInitialState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        lastApiCall: new Date(),
      };
    default:
      return state;
  }
};

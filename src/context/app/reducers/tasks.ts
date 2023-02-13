import { ITask } from '../../../models/ITasks/ITask';

export interface ITaskState {
  tasks: ITask[];
  selectedTask: ITask | null;
  isTaskDone: boolean;
  lastApiCall: Date | null;
}

export type TaskAction =
  | {
      type: 'SET_TASKS';
      payload: ITask[];
    }
  | { type: 'SET_SELECTED_TASK'; payload: ITask }
  | { type: 'SET_TASK_DONE'; payload: boolean };

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
    case 'SET_SELECTED_TASK':
      return {
        ...state,
        selectedTask: action.payload,
      };
    case 'SET_TASK_DONE':
      return {
        ...state,
        isTaskDone: action.payload,
      };
    default:
      return state;
  }
};

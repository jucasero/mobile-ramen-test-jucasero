import { createContext, useReducer } from 'react';
import { ITask } from '../../models/ITasks/ITask';
import { TaskAction, taskReducer } from './reducer';

export interface IInitialState {
  tasks: ITask[];
  lastApiCall: Date | null;
}

const initialState: IInitialState = {
  tasks: [],
  lastApiCall: null,
};

interface ITaskContext {
  taskState: IInitialState;
  dispatch: React.Dispatch<TaskAction>;
}

export const TaskContext = createContext<ITaskContext>(null);

export const TaskProvider: React.FC = ({ children }) => {
  const [taskState, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider
      value={{
        taskState,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

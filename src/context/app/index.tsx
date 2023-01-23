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

interface IAppContext {
  taskState: IInitialState;
  dispatch: React.Dispatch<TaskAction>;
}

export const AppContext = createContext<IAppContext>(null);

export const AppProvider: React.FC = ({ children }) => {
  const [taskState, dispatch] = useReducer(taskReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        taskState,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

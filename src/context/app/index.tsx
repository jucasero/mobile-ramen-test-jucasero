import { createContext, useReducer } from 'react';
import { ITaskState, TaskAction, taskReducer } from './reducers/tasks';

export interface IAppState {
  taskState: ITaskState;
}

const initialState: IAppState = {
  taskState: { tasks: [], lastApiCall: null },
};

interface IAppContext {
  appState: IAppState;
  dispatch: React.Dispatch<TaskAction>;
}

export const AppContext = createContext<IAppContext>(null);

const appReducer = ({ taskState }: IAppState, action: TaskAction) => ({
  taskState: taskReducer(taskState, action),
});

export const AppProvider: React.FC = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        appState,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

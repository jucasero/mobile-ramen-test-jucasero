import { createContext, useContext, useReducer } from 'react';

// interface IReducer {
//   state: Array<any>;
//   action: object;
// }

// interface IState {
//   tasks: any[];
// }

const initialState = {
  tasks: [],
};

export const FoundRateContext = createContext(null);

export const TasksDispatchContext = createContext(null);

export const FoundRateProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <FoundRateContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </FoundRateContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(FoundRateContext);
};

export const useTasksDispatch = () => {
  return useContext(TasksDispatchContext);
};

const tasksReducer = ({ state, action }: { state: any; action: any }) => {
  switch (action.type) {
    // TODO: example to execute.
    case 'deleted': {
      return { ...state };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

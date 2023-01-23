import { createContext, useReducer } from 'react';
import { IFoundRateData } from '../../models/found-rate/IData';
import { FoundRateAction, taskReducer } from './reducer';

export interface IInitialState {
  foundRateData: IFoundRateData[];
}

const initialState: IInitialState = {
  foundRateData: [],
};

interface IFoundRateContext {
  foundRateState: IInitialState;
  dispatch: React.Dispatch<FoundRateAction>;
}

export const FoundRateContext = createContext<IFoundRateContext>(null);

export const FoundRateProvider: React.FC = ({ children }) => {
  const [foundRateState, dispatch] = useReducer(taskReducer, initialState);

  return (
    <FoundRateContext.Provider
      value={{
        foundRateState,
        dispatch,
      }}
    >
      {children}
    </FoundRateContext.Provider>
  );
};

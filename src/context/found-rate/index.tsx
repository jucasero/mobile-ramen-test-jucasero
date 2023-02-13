import { createContext, useReducer } from 'react';
import { IFoundRateData } from '../../models/found-rate/IData';
import { IProduct } from '../../models/found-rate/IProduct';
import { FoundRateAction, taskReducer } from './reducer';

export interface IInitialState {
  foundRateData: IFoundRateData[];
  selectedCategory: IFoundRateData;
  selectedProduct: IProduct;
}

const initialState: IInitialState = {
  foundRateData: [],
  selectedCategory: null,
  selectedProduct: null,
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

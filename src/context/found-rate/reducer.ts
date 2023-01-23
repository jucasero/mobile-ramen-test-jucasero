import { IInitialState } from '.';
import { IFoundRateData } from '../../models/found-rate/IData';
import { IProduct } from '../../models/found-rate/IProduct';

export type FoundRateAction =
  | { type: 'SET_DATA'; payload: IFoundRateData[] }
  | { type: 'SET_SELECTED_CATEGORY'; payload: IFoundRateData }
  | { type: 'SET_SELECTED_PRODUCT'; payload: IProduct };

export const taskReducer = (
  state: IInitialState,
  action: FoundRateAction
): IInitialState => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        foundRateData: action.payload,
      };
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case 'SET_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: action.payload,
      };
    default:
      return state;
  }
};

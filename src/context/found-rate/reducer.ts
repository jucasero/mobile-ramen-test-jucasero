import { IInitialState } from '.';
import { IFoundRateData } from '../../models/found-rate/IData';

export type FoundRateAction = { type: 'SET_DATA'; payload: IFoundRateData[] };

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
    default:
      return state;
  }
};

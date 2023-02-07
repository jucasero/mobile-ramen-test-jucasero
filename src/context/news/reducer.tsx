import { INew } from '../../models/INews/ICategory';

export interface INewsState {
  news: INew[];
  selectedNew: INew | null;
  isNewReaded: boolean;
  lastApiCall: Date | null;
}

export type NewsAction =
  | {
      type: 'SET_NEWS';
      payload: INew[];
    }
  | { type: 'SET_SELECTED_NEW'; payload: INew }
  | { type: 'SET_NEW_READED'; payload: boolean };

export const newsReducer = (
  state: INewsState,
  action: NewsAction
): INewsState => {
  switch (action.type) {
    case 'SET_NEWS':
      return {
        ...state,
        news: action.payload,
        lastApiCall: new Date(),
      };
    case 'SET_SELECTED_NEW':
      return {
        ...state,
        selectedNew: action.payload,
      };
    case 'SET_NEW_READED':
      return {
        ...state,
        isNewReaded: action.payload,
      };
    default:
      return state;
  }
};

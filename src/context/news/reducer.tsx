import { INew } from '../../models/INews/ICategory';

export interface INewsState {
  news: Array<INew>;
}

export type NewsAction =
  | {
      type: 'SET_NEWS';
      payload: any;
    }
  | { type: 'SET_NEW_READED'; payload: any };

export const newsReducer = (
  state: INewsState,
  action: NewsAction
): INewsState => {
  switch (action.type) {
    case 'SET_NEWS': {
      return {
        ...state,
        news: action.payload,
      };
    }
    case 'SET_NEW_READED': {
      const index = state.news.findIndex((item) => item.id === action.payload);
      const updatedNewsItem = {
        ...state.news[index],
        readed: true,
      };
      const news = [
        ...state.news.slice(0, index),
        updatedNewsItem,
        ...state.news.slice(index + 1),
      ];
      return {
        ...state,
        news,
      };
    }
    default:
      return state;
  }
};

import { INew } from '../../../models/INews/ICategory';

export interface INewsState {
  news: any;
}

interface ISetNewReadedPayload {
  idCategory: string;
  id: string;
}

export type NewsAction =
  | {
      type: 'SET_NEWS';
      payload: INew[];
    }
  | { type: 'SET_NEW_READED'; payload: ISetNewReadedPayload };

export const newsReducer = (state: INewsState, action: NewsAction) => {
  switch (action.type) {
    case 'SET_NEWS': {
      const news = action.payload?.reduce((acc: any, item: INew) => {
        const { idCategory } = item;
        if (!acc[idCategory]) {
          acc[idCategory] = [];
        }
        acc[idCategory].push(item);
        return acc;
      }, {});

      return {
        ...state,
        news,
      };
    }
    case 'SET_NEW_READED': {
      const { idCategory, id } = action.payload;
      const category = state.news[idCategory];

      const updatedCategory = category.map((item: INew) =>
        item.id === id ? { ...item, readed: true } : item
      );
      return {
        ...state,
        news: {
          ...state.news,
          [idCategory]: updatedCategory,
        },
      };
    }
    default:
      return state;
  }
};

import { createContext, useReducer } from 'react';
import { INewsState, NewsAction, newsReducer } from './reducer';

export interface IAppState {
  newsState: INewsState;
}

const initialState: IAppState = {
  newsState: {
    news: [],
  },
};

interface INewsContext {
  appState: IAppState;
  dispatch: React.Dispatch<NewsAction>;
}

export const NewsContext = createContext<INewsContext>(null);

const appReducer = ({ newsState }: IAppState, action: NewsAction) => ({
  newsState: newsReducer(newsState, action),
});

export const NewsProvider: React.FC = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  return (
    <NewsContext.Provider
      value={{
        appState,
        dispatch,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

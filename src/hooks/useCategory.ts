import { useContext, useEffect, useState } from 'react';
import { FoundRateContext } from '../context';
import { IFoundRateData } from '../models/found-rate/IData';
import useFetch from './useFetch';

export default function useCategory<T>(
  promise: Promise<T>
): [
  fetchCategoryUsingContext: () => void,
  data: T | null,
  isLoading: boolean,
  error: any
] {
  const [categoryWithContext, setCategoryWithContext] = useState(null);
  const [fecthCategory, categories, isLoading, error] = useFetch(promise);
  const { foundRateState, dispatch } = useContext(FoundRateContext);

  const fetchCategoryUsingContext = () => {
    if (!foundRateState.foundRateData.length) fecthCategory();
    else setCategoryWithContext(foundRateState.foundRateData);
  };

  useEffect(() => {
    if (isLoading || error) setCategoryWithContext(null);
    if (categories) {
      setCategoryWithContext(categories);
      dispatch({ type: 'SET_DATA', payload: categories as IFoundRateData[] });
    }
  }, [categories, isLoading, error]);

  return [fetchCategoryUsingContext, categoryWithContext, isLoading, error];
}

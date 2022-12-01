import { useState } from "react";

interface IState<T> {
  isLoading: boolean;
  error: any;
  data: T | null;
}

export default function useFetch<T>(
  promise: Promise<T>
): [
  fetchData: () => Promise<void>,
  data: T | null,
  isLoading: boolean,
  error: any
] {
  const [state, setState] = useState<IState<T>>({
    isLoading: false,
    error: null,
    data: null,
  });

  const fetchData = async () => {
    try {
      setState({ isLoading: true, data: null, error: null });
      const result = await promise;
      setState({ isLoading: false, data: result, error: null });
    } catch (error: any) {
      setState({ isLoading: false, data: null, error });
    }
  };

  return [fetchData, state.data, state.isLoading, state.error];
}

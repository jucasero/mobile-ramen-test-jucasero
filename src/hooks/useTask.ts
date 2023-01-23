import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import { ITask } from '../models/ITasks/ITask';
import useFetch from './useFetch';

export default function useTask<T>(
  promise: Promise<T>,
  minutesToRefresh: number
): [
  fetchTaskUsingContext: () => void,
  data: T | null,
  isLoading: boolean,
  error: any
] {
  const [taskWithContext, setTaskWithContext] = useState(null);
  const [fecthTask, tasks, isLoading, error] = useFetch(promise);
  const {
    appState: { taskState },
    dispatch,
  } = useContext(AppContext);

  const isInvalidTime = () => {
    if (!taskState.lastApiCall) return true;
    const now = new Date();
    const diff = now.getTime() - taskState.lastApiCall.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    return minutes >= minutesToRefresh;
  };

  const fetchTaskUsingContext = () => {
    if (isInvalidTime()) fecthTask();
    else setTaskWithContext(taskState.tasks);
  };

  useEffect(() => {
    if (isLoading || error) setTaskWithContext(null);
    if (tasks) {
      setTaskWithContext(tasks);
      dispatch({ type: 'SET_TASKS', payload: tasks as ITask[] });
    }
  }, [tasks, isLoading, error]);

  return [fetchTaskUsingContext, taskWithContext, isLoading, error];
}

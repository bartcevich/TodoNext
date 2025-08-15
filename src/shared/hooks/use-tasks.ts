import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { addList } from '@/store/slices/tasksSlice';
import type { TaskList } from '@/entities/task-list/types';

export const useTaskLists = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Явное приведение типа
  const lists = useSelector((state: RootState) => 
    Object.values(state.tasks.lists) as TaskList[]
  );

  const createList = (name: string) => {
    const id = crypto.randomUUID();
    dispatch(addList({ id, name }));
  };

  return { lists, createList };
};
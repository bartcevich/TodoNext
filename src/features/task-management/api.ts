import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { addList, deleteList } from '@/store/slices/tasksSlice';
import type { TaskList } from '@/entities/task-list/types';

export const useTaskLists = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector((state: RootState) => state.tasks.lists);

  const handleCreateList = (id: string, name: string) => {
    dispatch(addList({ id, name }));
  };

  const handleDeleteList = (id: string) => {
    dispatch(deleteList(id));
  };
  
  return { 
    lists: Object.values(lists) as TaskList[],
    createList: handleCreateList, 
    deleteList: handleDeleteList
  };
};

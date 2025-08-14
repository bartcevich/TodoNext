import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { addTask } from '@/store/slices/tasksSlice';
import type { Task } from '@/entities/task/types';

export const useTasks = (listId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => 
    state.tasks.lists[listId]?.tasks || []
  );

  const handleAddTask = (title: string) => {
    dispatch(addTask({
      listId,
      task: {
          id: crypto.randomUUID(),
          title,
          listId: ''
      }
    }));
  };

  return { 
    tasks: tasks as Task[], // Явное приведение типа
    addTask: handleAddTask 
  };
};
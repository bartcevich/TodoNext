import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Task, TaskList } from '@/entities/task-list/types';

interface TasksState {
  lists: Record<string, TaskList>;
  currentListId: string | null;
}

const initialState: TasksState = {
  lists: {},
  currentListId: null,
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;
      state.lists[id] = {
        id,
        name,
        tasks: [],
        createdAt: new Date().toISOString(),
      };
    },
    editList: (state, action: PayloadAction<{ id: string; name: string }>) => {
      if (state.lists[action.payload.id]) {
        state.lists[action.payload.id].name = action.payload.name
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      delete state.lists[action.payload]
      if (state.currentListId === action.payload) {
        state.currentListId = null
      }
    },
    addTask: (state, action: PayloadAction<{
  listId: string;
  task: Omit<Task, 'completed' | 'muteNotifications'>;
}>) => {
  const { listId, task } = action.payload;
  if (state.lists[listId]) {
    state.lists[listId].tasks.push({
      ...task,
      description: task.description || "", // Обеспечиваем наличие description
      completed: false,
      muteNotifications: false
    });
  }
},
    editTask: (state, action: PayloadAction<{
    listId: string;
    taskId: string;
    changes: Partial<Omit<Task, 'id' | 'listId'>>;
  }>) => {
    const { listId, taskId, changes } = action.payload;
    const task = state.lists[listId]?.tasks.find(t => t.id === taskId);
    if (task) {
      Object.assign(task, changes);
    }
  },
  deleteTask: (state, action: PayloadAction<{
    listId: string;
    taskId: string;
  }>) => {
    const { listId, taskId } = action.payload;
    const tasks = state.lists[listId]?.tasks;
    if (tasks) {
      state.lists[listId].tasks = tasks.filter(t => t.id !== taskId);
    }
  },
    toggleTask: (state, action: PayloadAction<{ listId: string; taskId: string }>) => {
      const { listId, taskId } = action.payload
      const task = state.lists[listId]?.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
      }
    },
    setCurrentList: (state, action: PayloadAction<string>) => {
      state.currentListId = action.payload
    },
  },
})

// Экспортируем все actions
export const { 
  addList, 
  editList, 
  deleteList, 
  addTask,
  editTask,
  deleteTask, 
  toggleTask, 
  setCurrentList 
} = tasksSlice.actions

// export type { TasksState };
export default tasksSlice.reducer
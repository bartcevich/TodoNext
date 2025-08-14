import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Task {
  id: string
  title: string
  completed: boolean
  listId: string
}

interface TaskList {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: string;
}

interface TasksState {
  lists: Record<string, TaskList>; // Используем TaskList вместо встроенного типа
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
      task: Omit<Task, 'completed'>;
    }>) => {
      const { listId, task } = action.payload;
      if (state.lists[listId]) {
        state.lists[listId].tasks.push({
          ...task,
          completed: false,
        });
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
  toggleTask, 
  setCurrentList 
} = tasksSlice.actions

export default tasksSlice.reducer
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
// import { loadState, saveState } from '@/shared/lib/localStorage';
// import type { TasksState } from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//Подписываемся на изменения хранилища
// store.subscribe(() => {
//   saveState('tasks', store.getState().tasks);
// });
// // 1. Создаем функцию для загрузки начального состояния
// const loadInitialState = (): TasksState => {
//   const loadedState = loadState<TasksState>('tasks');
//   return loadedState ?? {
//     lists: {},
//     currentListId: null,
//   };
// };

// // 2. Создаем хранилище с явными типами
// export const store = configureStore({
//   reducer: {
//     tasks: tasksReducer,
//   },
//   preloadedState: {
//     tasks: loadInitialState()
//   }
// });

// // 3. Подписка на изменения
// store.subscribe(() => {
//   const state = store.getState();
//   saveState('tasks', state.tasks);
// });

// Типы для работы с хранилищем
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export interface TaskList {
//   id: string;
//   name: string;  // Изменил title на name для согласованности с вашим кодом
//   tasks?: [];
//   createdAt?: string;
// }

// export interface TaskList {
//   id: string;
//   title: string;
//   tasks?: []; // Опционально, если нужно сразу подгружать задачи
//   userId: string;
//   createdAt: Date;
// }
// entities/task-list/types.ts
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  listId: string;
}

export interface TaskList {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: string;
}
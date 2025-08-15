// entities/task/types.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  listId: string;
  dueDate?:  string | null;
  muteNotifications?: boolean;
  createdAt?: string;
}
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  listId: string;
  description: string
  muteNotifications: boolean
}

export interface TaskList {
  id: string;
  name: string;
  tasks: Task[];
  createdAt: string;
}
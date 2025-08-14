"use client";
import { useTasks } from "@/features/task-management/apiTasks";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

interface TaskListDetailsProps {
  listId: string;
}

export const TaskListDetails = ({ listId }: TaskListDetailsProps) => {
  const { tasks, addTask } = useTasks(listId);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Новая задача"
        />
        <Button onClick={handleAddTask}>Добавить</Button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="p-3 border rounded text-blue-500">
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
};

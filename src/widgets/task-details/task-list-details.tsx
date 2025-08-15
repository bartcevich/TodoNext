"use client";
import { useTasks } from "@/features/task-management/apiTasks";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { TaskCard } from "../task-card";

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
  // console.log("task-list-details.tsx", listId, tasks);
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
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} listId={listId} />
        ))}
      </div>
    </div>
  );
};

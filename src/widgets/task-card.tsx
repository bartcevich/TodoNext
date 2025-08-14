"use client";
import type { Task } from "@/entities/task/types";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="font-medium">{task.title}</h3>
      <p className="text-sm text-gray-500">
        {task.completed ? "✅ Выполнено" : "❌ Не выполнено"}
      </p>
      {/* <button 
  onClick={() => onToggle(task.id)}
  className={task.completed ? "text-green-500" : "text-gray-400"}
>
  {task.completed ? "✓" : "○"}
</button> */}
    </div>
  );
};

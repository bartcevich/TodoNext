"use client";
import { useState } from "react";
import { TaskModal } from "@/widgets/task-modal";
import type { Task } from "@/entities/task/types";

export const TaskCard = ({ task, listId }: { task: Task; listId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-3 border rounded cursor-pointer hover:bg-gray-50"
      >
        <div className="flex justify-between text-blue-500">
          <div className="flex-1 min-w-0">
            {" "}
            {/* Добавляем контейнер для текста */}
            <h4 className="font-medium truncate">{task.title}</h4>
            {task.description && (
              <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                {" "}
                {/* line-clamp-3 для ограничения строк */}
                {task.description}
              </p>
            )}
          </div>
          {task.dueDate && (
            <span className="text-sm text-blue-500 ml-2 whitespace-nowrap">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {isModalOpen && (
        <TaskModal
          task={task}
          listId={listId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

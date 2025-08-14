"use client";
import { useAuth } from "@/shared/hooks/useAuth";
import { TaskListsPanel } from "@/widgets/task-list/task-lists-panel";

export default function TasksPage() {
  useAuth(); // Будет редиректить если не авторизован

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Мои списки задач
        </h1>
        <TaskListsPanel />
      </div>
    </div>
  );
}

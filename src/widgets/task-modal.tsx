"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useDispatch } from "react-redux";
import { editTask, deleteTask } from "@/store/slices/tasksSlice";
import { Task } from "@/entities/task/types";

// Временный компонент Textarea
const Textarea = ({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}) => (
  <textarea
    value={value}
    onChange={onChange}
    className={`border rounded p-2 w-full ${className}`}
  />
);

// Исправленный Checkbox
const Checkbox = ({
  checked,
  onCheckedChange,
  className,
  id,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  id?: string;
}) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className={`mr-2 ${className}`}
  />
);

interface TaskModalProps {
  task: Task;
  listId: string;
  onClose: () => void;
}

export const TaskModal = ({ task, listId, onClose }: TaskModalProps) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    ...task,
    dueDate: task.dueDate || "",
  });
  const [timeLeft, setTimeLeft] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  // console.log("task-modal.tsx", task, listId, onClose);

  // Обработка таймера
  useEffect(() => {
    if (!editedTask.dueDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const due = new Date(editedTask.dueDate);
      const diff = due.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("Время вышло!");
        if (!editedTask.muteNotifications && audioRef.current) {
          audioRef.current.play();
        }
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`);
    }, 1000);

    return () => clearInterval(interval);
  }, [editedTask.dueDate, editedTask.muteNotifications]);

  const handleSave = () => {
    const changes = {
      title: editedTask.title,
      description: editedTask.description,
      muteNotifications: editedTask.muteNotifications,
      ...(editedTask.dueDate && { dueDate: editedTask.dueDate }), // Добавляем dueDate только если он есть
    };
    // console.log(changes);
    dispatch(
      editTask({
        listId,
        taskId: task.id,
        changes,
      })
    );
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    dispatch(
      deleteTask({
        listId,
        taskId: task.id,
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Скрытый аудиоэлемент для уведомления */}
        <audio ref={audioRef} src="/notification.mp3" preload="auto" />

        {/* Шапка модального окна */}
        <div className="flex justify-between items-center mb-4 text-blue-500">
          {isEditing ? (
            <Input
              value={editedTask.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="text-xl font-bold flex-1"
            />
          ) : (
            <h3 className="text-xl font-bold  text-blue-500">{task.title}</h3>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-500 hover:text-blue-700"
            >
              {isEditing ? "✖" : "✏️"}
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Описание задачи */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Описание:
          </label>
          {isEditing ? (
            <Textarea
              value={editedTask.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              className="h-[150px]  text-blue-500"
            />
          ) : (
            <div className="border rounded p-3 h-[150px] overflow-y-auto  text-blue-500">
              {task.description || "Нет описания"}
            </div>
          )}
        </div>

        {/* Срок выполнения */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Выполнить до:
          </label>
          {isEditing ? (
            <Input
              type="datetime-local"
              value={editedTask.dueDate?.slice(0, 16) || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedTask({
                  ...editedTask,
                  dueDate: e.target.value,
                })
              }
            />
          ) : (
            <div className=" text-blue-500">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleString()
                : "Не установлено"}
            </div>
          )}
        </div>

        {/* Таймер обратного отсчета */}
        {editedTask.dueDate && (
          <div className="mb-4 p-3 bg-gray-100 rounded text-blue-500">
            <div className="font-medium">Осталось времени:</div>
            <div className="text-xl">{timeLeft}</div>
          </div>
        )}

        {/* Чекбокс для отключения звука */}
        <div className="flex items-center mb-4">
          <Checkbox
            id="mute-notifications"
            checked={editedTask.muteNotifications || false}
            onCheckedChange={(checked: boolean) =>
              setEditedTask({ ...editedTask, muteNotifications: checked })
            }
            className="mr-2"
          />
          <label htmlFor="mute-notifications" className="text-sm text-blue-500">
            Отключить звуковые уведомления
          </label>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setIsEditing(false)}
              className="bg-gray-100 hover:bg-gray-200"
            >
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addList,
  deleteList,
  editList,
  setCurrentList,
} from "@/store/slices/tasksSlice";
import type { RootState } from "@/store/store";

export default function TasksPage() {
  const [newListName, setNewListName] = useState("");
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [editedListName, setEditedListName] = useState("");

  const lists = useSelector((state: RootState) => state.tasks.lists);
  const dispatch = useDispatch();

  const handleAddList = () => {
    if (newListName.trim()) {
      const listId = Date.now().toString();
      dispatch(addList({ id: listId, name: newListName }));
      setNewListName("");
    }
  };

  const handleStartEdit = (listId: string, currentName: string) => {
    setEditingListId(listId);
    setEditedListName(currentName);
  };

  const handleSaveEdit = (listId: string) => {
    if (editedListName.trim()) {
      dispatch(editList({ id: listId, name: editedListName }));
      setEditingListId(null);
    }
  };

  const handleDeleteList = (listId: string) => {
    if (
      confirm("Вы уверены, что хотите удалить этот список и все его задачи?")
    ) {
      dispatch(deleteList(listId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Мои списки задач
        </h1>

        {/* Форма добавления нового списка */}
        <div className="flex mb-6">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Название нового списка"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddList}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
          >
            Добавить
          </button>
        </div>

        {/* Список всех списков задач */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(lists).map(([listId, list]) => (
            <div key={listId} className="bg-white p-4 rounded-lg shadow-md">
              {editingListId === listId ? (
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={editedListName}
                    onChange={(e) => setEditedListName(e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded-l-md"
                  />
                  <button
                    onClick={() => handleSaveEdit(listId)}
                    className="px-2 py-1 bg-green-500 text-white rounded-r-md hover:bg-green-600"
                  >
                    ✓
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">
                    {list.name}{" "}
                    <span className="text-sm text-gray-500">
                      ({list.tasks.length})
                    </span>
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStartEdit(listId, list.name)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteList(listId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}

              {/* Здесь можно добавить отображение задач внутри списка */}
              <div className="mt-2">
                {list.tasks.length === 0 && (
                  <p className="text-gray-500 text-sm">Нет задач</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

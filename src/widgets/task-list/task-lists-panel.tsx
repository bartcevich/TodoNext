"use client";
import { useState } from "react";
import { useTaskLists } from "@/features/task-management/api";
import { TaskListCard } from "@/widgets/task-list/task-list-card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { TaskListDetails } from "../task-details/task-list-details";
import { useDispatch } from "react-redux";
import { editList } from "@/store/slices/tasksSlice";

export const TaskListsPanel = () => {
  const { lists, createList, deleteList: deleteListHook } = useTaskLists();
  //   console.log(lists);
  const [newListTitle, setNewListTitle] = useState("");
  const [editedListName, setEditedListName] = useState("");
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleCreate = () => {
    if (newListTitle.trim()) {
      const listId =
        Date.now().toString() + Math.random().toString(36).substring(2, 9);
      createList(listId, newListTitle);
      setNewListTitle("");
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
      deleteListHook(listId); // Используем переименованную функцию из хука
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="Название списка"
        />
        <Button onClick={handleCreate}>Создать</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {Object.values(lists).map((list) => (
          <div key={list.id} className="w-[361px] ">
            <div className="bg-white p-4 rounded-lg shadow-md">
              {editingListId === list.id ? (
                <div className="flex mb-2">
                  <input
                    type="text"
                    value={editedListName}
                    onChange={(e) => setEditedListName(e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded-l-md"
                  />
                  <button
                    onClick={() => handleSaveEdit(list.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded-r-md hover:bg-green-600"
                  >
                    ✓
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg text-blue-500">
                    {list.name}{" "}
                    <span className="text-sm text-gray-500">
                      ({list.tasks.length})
                    </span>
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStartEdit(list.id, list.name)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteList(list.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
            <TaskListCard list={list} />
            <TaskListDetails listId={list.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

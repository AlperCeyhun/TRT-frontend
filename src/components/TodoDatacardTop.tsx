"use client";

import React, { Dispatch, SetStateAction } from "react";
import { AddTaskSheet } from '@/components/TodoAddTaskSheet';
import { Category } from "@/lib/todo/fetchtodo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TodoDatacardTopProps {
  newTitle: string;
  newDescription: string;
  setNewTitle: Dispatch<SetStateAction<string>>;
  setNewDescription: Dispatch<SetStateAction<string>>;
  handleAddTask: (category: Category | null) => void;
  isTableView?: boolean;
}

const TodoDatacardTop: React.FC<TodoDatacardTopProps> = ({
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  handleAddTask,
  isTableView = false,
}) => {
  const router = useRouter();

  const handleSwitchView = () => {
    router.push(isTableView ? "/datacard" : "/datatable");
  };

  return (
    <div className="mb-4 flex flex-row items-center justify-between w-[800px]">
      <h2 className="text-xl font-bold text-white">📝To-do List</h2>
      <div className="flex items-center space-x-2 mt-2">
        <div className="flex items-center space-x-2">
          <Button onClick={handleSwitchView} variant={"outline"}>
            <span className="text-sm font-semibold">
              {isTableView ? "Go Edit View" : "Go Table View"}
            </span>
          </Button>
          <AddTaskSheet
            newTitle={newTitle}
            setNewTitle={setNewTitle} newDescription={newDescription} setNewDescription={setNewDescription}
            handleAddTask={handleAddTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoDatacardTop;
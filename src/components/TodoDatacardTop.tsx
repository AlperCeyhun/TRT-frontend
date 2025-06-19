"use client";

import React, { Dispatch, SetStateAction } from "react";
import { AddTaskSheet } from "@/components/TodoAddTaskSheet";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TodoDatacardTopProps {
  newTask: string;
  setNewTask: Dispatch<SetStateAction<string>>;
  handleAddTask: () => void;
  isTableView?: boolean;
}

const TodoDatacardTop: React.FC<TodoDatacardTopProps> = ({
  newTask,
  setNewTask,
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
            newTask={newTask}
            setNewTask={setNewTask}
            handleAddTask={handleAddTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoDatacardTop;
import React, { Dispatch, SetStateAction } from "react";
import { AddTaskSheet } from '@/components/TodoAddTaskSheet';
import { Category } from "@/lib/fetchtodo";

interface TodoDatacardTopProps {
  newTitle: string;
  newDescription: string;
  setNewTitle: Dispatch<SetStateAction<string>>;
  setNewDescription: Dispatch<SetStateAction<string>>;
  handleAddTask: (category: Category | null) => void;
}

const TodoDatacardTop: React.FC<TodoDatacardTopProps> = ({
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  handleAddTask,
}) => (
  <div className="mb-4 flex flex-row items-center justify-between w-[600px]">
    <h2 className="text-xl font-bold text-white">📝To-do List</h2>
    <div className="flex items-center space-x-2 mt-2">
      <AddTaskSheet newTitle={newTitle} setNewTitle={setNewTitle} newDescription={newDescription} setNewDescription={setNewDescription} handleAddTask={handleAddTask}/>
    </div>
  </div>
);

export default TodoDatacardTop;
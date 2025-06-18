import React, { Dispatch, SetStateAction } from "react";
import { AddTaskSheet } from '@/components/TodoAddTaskSheet';

interface TodoDatacardTopProps {
  newTask: string;
  setNewTask: Dispatch<SetStateAction<string>>;
  handleAddTask: () => void;
}

const TodoDatacardTop: React.FC<TodoDatacardTopProps> = ({
  newTask,
  setNewTask,
  handleAddTask,
}) => (
  <div className="mb-4 flex flex-row items-center justify-between w-[600px]">
    <h2 className="text-xl font-bold text-white">📝To-do List</h2>
    <div className="flex items-center space-x-2 mt-2">
      <AddTaskSheet newTask={newTask} setNewTask={setNewTask} handleAddTask={handleAddTask}/>
    </div>
  </div>
);

export default TodoDatacardTop;
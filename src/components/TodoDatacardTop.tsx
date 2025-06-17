import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TodoDatacardTopProps {
  newTask: string;
  setNewTask: (value: string) => void;
  handleAddTask: () => void;
}

const TodoDatacardTop: React.FC<TodoDatacardTopProps> = ({
  newTask,
  setNewTask,
  handleAddTask,
}) => (
  <div className="mb-4 flex flex-row items-center justify-between w-full">
    <h2 className="text-xl font-bold text-white">📝To-do List</h2>
    <div className="flex items-center space-x-2 mt-2">
      <input
        type="text"
        placeholder="Enter new task"
        className="px-3 py-2 rounded-md border border-gray-600 bg-white text-black w-[250px]"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button variant="secondary" onClick={handleAddTask}>
        <Plus className="mr-2" />
        Add Task
      </Button>
    </div>
  </div>
);

export default TodoDatacardTop;
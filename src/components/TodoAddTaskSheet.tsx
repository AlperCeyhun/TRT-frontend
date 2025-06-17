import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface AddTaskSheetProps {
  newTask: string;
  setNewTask: Dispatch<SetStateAction<string>>;
  handleAddTask: () => void;
}

export function AddTaskSheet({ newTask, setNewTask, handleAddTask }: AddTaskSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <Plus className="mr-2" />
          Add Task
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Task</SheetTitle>
          <SheetDescription>Write the name of your next task!</SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <Input
            type="text"
            placeholder="e.g. Defeat the dragon"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <SheetClose asChild>
            <Button variant={"default"} className="bg-black ml-2" onClick={handleAddTask} disabled={!newTask.trim()}>
              Add Task
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default AddTaskSheet;
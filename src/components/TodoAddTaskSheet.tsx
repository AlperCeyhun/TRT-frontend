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
  newTitle: string;
  newDescription: string;
  setNewTitle: Dispatch<SetStateAction<string>>;
  setNewDescription: Dispatch<SetStateAction<string>>;
  handleAddTask: () => void;
}

export function AddTaskSheet({
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  handleAddTask,
}: AddTaskSheetProps) {
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
        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="task-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="task-title"
              type="text"
              placeholder="e.g. Defeat the Grafted Scion"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              maxLength={32}
            />
            <span className={`text-xs text-right ${newTitle.length > 30 ? "text-red-500" : "text-muted-foreground"}`}>
              {newTitle.length}/32 characters
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="task-desc" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="task-desc"
              placeholder="e.g. Put thy ambitions to rest."
              className="border rounded-md p-2 resize-none min-h-[100px]"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              maxLength={32}
            />
            <span className={`text-xs text-right ${newDescription.length > 30 ? "text-red-500" : "text-muted-foreground"}`}>
              {newDescription.length}/32 characters
            </span>
          </div>

          <SheetClose asChild>
            <Button
              variant="default"
              className="bg-black ml-2 mr-2 mt-8"
              onClick={handleAddTask}
              disabled={!newTitle.trim() && !newDescription.trim()}
            >
              Add Task
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AddTaskSheet;
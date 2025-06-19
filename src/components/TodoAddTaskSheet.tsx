import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Category } from "@/lib/fetchtodo";

interface AddTaskSheetProps {
  newTitle: string;
  newDescription: string;
  setNewTitle: Dispatch<SetStateAction<string>>;
  setNewDescription: Dispatch<SetStateAction<string>>;
  handleAddTask: (category: Category | null) => void;
}

const categoryOptions = [
  { label: "Acil", value: Category.Acil },
  { label: "Normal", value: Category.Normal },
  { label: "Düşük Öncelik", value: Category.DusukOncelik },
];

export function AddTaskSheet({
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  handleAddTask,
}: AddTaskSheetProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

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
            <label htmlFor="task-title" className="text-sm font-medium ml-2">
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
            <label htmlFor="task-desc" className="text-sm font-medium ml-2">
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

          <div className="flex flex-col space-y-1">
            <label htmlFor="task-category" className="text-sm font-medium ml-2">
              Category
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between">
                  {category
                    ? categoryOptions.find((opt) => opt.value === category)?.label
                    : "Select category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search category..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categoryOptions.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={opt.value}
                          onSelect={() => {
                            setCategory(opt.value);
                            setOpen(false);
                          }}>
                          {opt.label}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              category === opt.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <SheetClose asChild>
            <Button
              variant="default"
              className="bg-black ml-2 mr-2 mt-8"
              onClick={() => handleAddTask(category)}
              disabled={!newTitle.trim() && !newDescription.trim()}>
              Add Task
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AddTaskSheet;
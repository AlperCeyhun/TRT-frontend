"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandItem } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

enum Category {
  Acil = "Acil",
  Normal = "Normal",
  DusukOncelik = "DusukOncelik",
}

interface TodoUpdateTaskSheetProps {
  todo: {
    id: number;
    title: string;
    description: string;
    category: Category;
    completed: boolean;
  };
  onUpdate: (
    id: number,
    updates: {
      title: string;
      description: string;
      category: Category;
      completed: boolean;
    }
  ) => void | Promise<void>;
}

const categoryOptions = [
  { label: "Acil", value: Category.Acil },
  { label: "Normal", value: Category.Normal },
  { label: "Düşük Öncelik", value: Category.DusukOncelik },
];

export function TodoUpdateTaskSheet({ todo, onUpdate }: TodoUpdateTaskSheetProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Local states for editing fields
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [category, setCategory] = useState<Category>(todo.category);
  const [completed, setCompleted] = useState<boolean>(todo.completed);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(todo.id, { title, description, category, completed });
    setSheetOpen(false);
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={popoverOpen}
                  className="justify-between w-full"
                  type="button"
                >
                  {categoryOptions.find((opt) => opt.value === category)?.label ?? "Select category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  {categoryOptions.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      value={opt.value}
                      onSelect={() => {
                        setCategory(opt.value as Category);
                        setPopoverOpen(false);
                      }}
                    >
                      {opt.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          category === opt.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="completed"
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <Label htmlFor="completed">Completed</Label>
          </div>
          <SheetFooter>
            <Button type="submit" variant="default">
              Save
            </Button>
            <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default TodoUpdateTaskSheet;
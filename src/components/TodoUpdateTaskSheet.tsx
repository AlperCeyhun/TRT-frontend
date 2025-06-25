"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandItem } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Assignee } from "./TodoDataTable";
import { useTranslations } from "next-intl";
import { getUserPermissions } from "@/lib/user/getUserPermissions";

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
    assignees: Assignee[];
  };
  allAssignees: Assignee[];
  onUpdate: (
    id: number,
    updates: {
      title: string;
      description: string;
      category: Category;
      completed: boolean;
      assignees: Assignee[];
    }
  ) => void | Promise<void>;
}

const categoryOptions = [
  { label: "Acil", value: Category.Acil },
  { label: "Normal", value: Category.Normal },
  { label: "Düşük Öncelik", value: Category.DusukOncelik },
];

export function TodoUpdateTaskSheet({ todo, onUpdate, allAssignees }: TodoUpdateTaskSheetProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [assigneePopoverOpen, setAssigneePopoverOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [category, setCategory] = useState<Category>(todo.category);
  const [completed, setCompleted] = useState<boolean>(todo.completed);
  const [selectedAssignees, setSelectedAssignees] = useState<Assignee[]>(todo.assignees || []);
  const t = useTranslations("edit_sheet");

  const permissions = typeof window !== "undefined" ? getUserPermissions() : [];
  const canEditTitle = permissions.includes("Edit Task Title");
  const canEditDescription = permissions.includes("Edit Task Description");
  const canEditStatus = permissions.includes("Edit Task Status");
  const canEditAssignees = permissions.includes("Edit Task Assignees");

  const toggleAssignee = (user: Assignee) => {
    if (selectedAssignees.find((a) => a.userId === user.userId)) {
      setSelectedAssignees((prev) => prev.filter((a) => a.userId !== user.userId));
    } else {
      setSelectedAssignees((prev) => [...prev, user]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(todo.id, {
      title,
      description,
      category,
      completed,
      assignees: selectedAssignees,
    });
    setSheetOpen(false);
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          {t("button_edit")}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("sheet_title")}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {canEditTitle && (
            <div>
              <Label htmlFor="title">{t("task_title")}</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
                required
              />
            </div>
          )}

          {canEditDescription && (
            <div>
              <Label htmlFor="description">{t("task_description")}</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          {canEditStatus && (
            <div>
              <Label>{t("task_category")}</Label>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={popoverOpen}
                    className="justify-between w-full"
                    type="button"
                  >
                    {categoryOptions.find((opt) => opt.value === category)?.label ?? t("dropdown_title")}
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
                          className={cn("ml-auto h-4 w-4", category === opt.value ? "opacity-100" : "opacity-0")}
                        />
                      </CommandItem>
                    ))}
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {canEditAssignees && (
            <div>
              <Label>{t("task_assignees")}</Label>
              <Popover open={assigneePopoverOpen} onOpenChange={setAssigneePopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedAssignees.length > 0
                      ? selectedAssignees.map((a) => a.username).join(", ")
                      : t("task_assignees_title")}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    {allAssignees.map((user) => {
                      const isSelected = selectedAssignees.some((a) => a.userId === user.userId);
                      return (
                        <CommandItem key={user.userId} onSelect={() => toggleAssignee(user)}>
                          {user.username}
                          <Check className={cn("ml-auto h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                        </CommandItem>
                      );
                    })}
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Category } from "@/lib/todo/fetchtodo";
import {useTranslations} from 'next-intl';

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
  const t = useTranslations('add_sheet');
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <Plus className="mr-2" />
          {t("button_add")}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("sheet_title")}</SheetTitle>
          <SheetDescription>{t("sheet_description")}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="task-title" className="text-sm font-medium ml-2">
              {t("task_title")}
            </label>
            <Input
              id="task-title"
              type="text"
              placeholder={t("task_title_prompt")}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              maxLength={32}
            />
            <span className={`text-xs text-right ${newTitle.length > 30 ? "text-red-500" : "text-muted-foreground"}`}>
              {newTitle.length}/32 {t("max_character_prompt")}
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="task-desc" className="text-sm font-medium ml-2">
              {t("task_description")}
            </label>
            <textarea
              id="task-desc"
              placeholder={t("task_description_prompt")}
              className="border rounded-md p-2 resize-none min-h-[100px]"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              maxLength={32}
            />
            <span className={`text-xs text-right ${newDescription.length > 30 ? "text-red-500" : "text-muted-foreground"}`}>
              {newDescription.length}/32 {t("max_character_prompt")}
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="task-category" className="text-sm font-medium ml-2">
              {t("task_category")}
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
                    : t("dropdown_title")}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder={t("dropdown_search_prompt")} className="h-9" />
                  <CommandList>
                    <CommandEmpty>{t("dropdown_empty")}</CommandEmpty>
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
              disabled={!newTitle.trim() || !newDescription.trim() || !category}>
              {t("button_add_task")}
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AddTaskSheet;
"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AddTaskSheet } from "@/components/TodoAddTaskSheet";
import { Category } from "@/lib/todo/fetchtodo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getUserPermissions } from "@/lib/user/getUserPermissions";
import { requiredEditPermissions } from "@/lib/user/requiredEditPermissions";
import { checkAnyPermission } from "@/lib/user/checkAnyPermission";

interface TodoDatacardTopProps {
  newTitle: string;
  newDescription: string;
  setNewTitle: Dispatch<SetStateAction<string>>;
  setNewDescription: Dispatch<SetStateAction<string>>;
  handleAddTask: (category: Category | null) => void;
  isTableView?: boolean;
}

const TodoDatacardTop: React.FC<TodoDatacardTopProps> = ({
  newTitle,
  newDescription,
  setNewTitle,
  setNewDescription,
  handleAddTask,
  isTableView = false,
}) => {
  const router = useRouter();
  const t = useTranslations("pgtop");

  const [canAddTask, setCanAddTask] = useState(false);
  const [canSwitchView, setCanSwitchView] = useState(false);

  useEffect(() => {
    const permissions = getUserPermissions();

    setCanAddTask(permissions.includes("Add Task"));

    const hasAnyEditPermissions = checkAnyPermission(permissions, requiredEditPermissions);
    setCanSwitchView(hasAnyEditPermissions);
  }, []);

  const handleSwitchView = () => {
    router.push(isTableView ? "/datacard" : "/datatable");
  };

  return (
    <div className="mb-4 flex flex-row items-center justify-between w-[800px]">
      <h2 className="text-xl font-bold text-white">{t("title")}</h2>
      <div className="flex items-center space-x-2 mt-2">
        <div className="flex items-center space-x-2">
          {canSwitchView && (
            <Button onClick={handleSwitchView} variant={"outline"}>
              <span className="text-sm font-semibold">
                {isTableView ? t("button_view_table") : t("button_view_card")}
              </span>
            </Button>
          )}

          {canAddTask && (
            <AddTaskSheet
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              newDescription={newDescription}
              setNewDescription={setNewDescription}
              handleAddTask={handleAddTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoDatacardTop;
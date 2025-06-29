import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/todo/fetchtodo";
import { UpdatePayload } from "@/lib/todo/updatetodo";
import TodoUpdateTaskSheet from "@/components/todo/TodoUpdateTaskSheet";
import { Assignee } from "./TodoDataTable";
import { useTranslations } from 'next-intl';
import { getUserPermissions } from "@/lib/user/getUserPermissions";
import { requiredEditPermissions } from "@/lib/user/requiredEditPermissions";
import { checkAnyPermission } from "@/lib/user/checkAnyPermission";

export interface Todo {
  id: number;
  title: string;
  description: string;
  category: Category;
  completed: boolean;
  assignees: Assignee[];
}

interface TodoDatacardContextProps {
  todos: Todo[];
  allAssignees: Assignee[];
  onCheck: (id: number, updates: UpdatePayload) => void | Promise<void>;
  onDelete: (id: number) => void;
}

const TodoDatacardContext: React.FC<TodoDatacardContextProps> = ({
  todos,
  allAssignees,
  onCheck,
  onDelete,
}) => {
  const t = useTranslations('datacard');

  const permissions = typeof window !== "undefined" ? getUserPermissions() : [];
  const canEdit = checkAnyPermission(permissions, requiredEditPermissions);
  const canDelete = permissions.includes("Delete Task");

  return (
    <>
      {todos.map((todo) => (
        <Card
          key={todo.id}
          className="w-[800px] h-[170px] flex flex-row justify-between items-center p-4"
        >
          <div>
            <CardHeader className="p-0 mb-1">
              <CardTitle className="w-[400px] min-h-[60px] break-words text-lg font-semibold">
                {todo.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription>
                <div className="mb-1">{todo.description || "No description provided."}</div>
                <div className="mt-1 flex flex-row space-x-2">
                  {todo.completed ? (
                    <Badge variant="default">{t('badge_true')}</Badge>
                  ) : (
                    <Badge variant="destructive">{t('badge_false')}</Badge>
                  )}
                  {todo.category === Category.Acil && (
                    <Badge variant="destructive">{todo.category}</Badge>
                  )}
                  {todo.category === Category.Normal && (
                    <Badge variant="secondary">{todo.category}</Badge>
                  )}
                  {todo.category === Category.DusukOncelik && (
                    <Badge variant="outline">{todo.category}</Badge>
                  )}
                </div>
                {todo.assignees?.length > 0 && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {t('assigned_to')} {todo.assignees.map((a) => a.username).join(", ")}
                  </div>
                )}
              </CardDescription>
            </CardContent>
          </div>
          <div className="flex gap-2">
            {canEdit && (
              <TodoUpdateTaskSheet todo={todo} onUpdate={onCheck} allAssignees={allAssignees} />
            )}
            {canDelete && (
              <Button
                variant="outline"
                className="ml-2 bg-red-600 text-white"
                onClick={() => onDelete(todo.id)}
              >
                {t('button_delete')}
              </Button>
            )}
          </div>
        </Card>
      ))}
    </>
  );
};

export default TodoDatacardContext;
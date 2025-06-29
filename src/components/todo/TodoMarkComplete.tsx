import { Category } from "@/lib/todo/fetchtodo";
import { updateTodo, UpdatePayload } from "@/lib/todo/updatetodo";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Assignee } from "./TodoDataTable";

interface Props {
  todo: {
    id: number;
    title: string;
    description: string;
    category: Category;
    completed: boolean
    assignee: Assignee[];
  };
  onUpdated?: () => void;
}

export function MarkCompleteDropdownItem({ todo, onUpdated }: Props) {
  const handleMarkComplete = async () => {
    try {
      const updates: UpdatePayload = {
        title: todo.title,
        description: todo.description,
        category: todo.category,
        completed: !todo.completed,
        assignees: todo.assignee
      };
      await updateTodo(todo.id, updates);

      if (onUpdated) onUpdated();
    } catch (error) {
      console.error("Failed to mark todo complete:", error);
    }
  };
  return (
    <DropdownMenuItem onClick={handleMarkComplete}>
      {todo.completed ? "Mark Incomplete" : "Mark Complete"}
    </DropdownMenuItem>
  );
}
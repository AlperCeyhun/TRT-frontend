import { Category, Todo } from "@/lib/todo/fetchtodo";
import { posttodo } from "@/lib/todo/posttodo";

type AddTaskParams = {
  newTitle: string;
  newDescription: string;
  category: Category | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export async function addTask({
  newTitle,
  newDescription,
  category,
  setTodos,
  setNewTitle,
  setError,
}: AddTaskParams) {
  if (!newTitle.trim() || category === null) return;

  try {
    const created = await posttodo({
      title: newTitle,
      description: newDescription,
      category,
      completed: false,
    });

    // dummy userId fix later
    const fullTodo: Todo = {
      ...created,
      userId: 1,
      description: newDescription || "",
      category,
      assigned: []
    };

    setTodos((prev) => [fullTodo, ...prev]);
    setNewTitle("");
  } catch (error) {
    setError("Failed to add task");
  }
}
import { Assignee } from "@/components/todo/TodoDataTable";

export enum Category {
  Acil = "Acil",
  Normal = "Normal",
  DusukOncelik = "DusukOncelik"
}

export type Todo = {
  userId: number;
  id: number;
  title: string;
  description: string;
  category: Category;
  completed: boolean;
  assignee: Assignee[];
};

type TodoApiResponse = {
  data: Todo[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export async function fetchTodos(
  pageNumber = 1,
  pageSize = 5
): Promise<TodoApiResponse> {
  const res = await fetch(`http://localhost:5195/api/todo-tasks?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.token,
        }});

  if (!res.ok) {
    throw new Error(`Failed to fetch todos. Status: ${res.status}`);
  }
  const json: TodoApiResponse = await res.json();
  return json;
}
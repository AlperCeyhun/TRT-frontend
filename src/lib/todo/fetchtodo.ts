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
};

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch('http://localhost:5195/api/todo-tasks');

  if (!res.ok) {
    throw new Error(`Failed to fetch todos. Status: ${res.status}`);
  }

  const data: Todo[] = await res.json();
  return data.slice(0, 14);
}
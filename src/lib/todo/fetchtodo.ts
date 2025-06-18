export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');

  if (!res.ok) {
    throw new Error(`Failed to fetch todos. Status: ${res.status}`);
  }

  const data: Todo[] = await res.json();
  return data.slice(0, 14);
}
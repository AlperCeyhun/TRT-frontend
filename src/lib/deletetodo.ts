export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function deleteTodo(id: number) {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete todo');
  }

  return true;
}
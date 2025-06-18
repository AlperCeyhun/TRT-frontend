export async function updateTodo(id: number, updates: { completed: boolean }) {
  const res = await fetch(`http://localhost:5195/api/todo-tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error(`Failed to update todo with ID ${id}`);
  }

  const data = await res.json();
  return data;
}
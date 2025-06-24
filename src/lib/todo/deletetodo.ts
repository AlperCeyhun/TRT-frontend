export async function deleteTodo(id: number) {
  const res = await fetch(`http://localhost:5195/api/todo-tasks/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete todo with ID ${id}`);
  }
  
  return true;
}
